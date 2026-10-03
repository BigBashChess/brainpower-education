import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {SITE} from '../src/data/site.js';
import {testById} from '../src/data/tests.js';

const base=process.env.SITE_URL||'http://127.0.0.1:8000/';
const out=process.env.QA_OUT||'qa-assessment-addition';
const id='specialist-sem2-tf-2026',paper=testById(id),errors=[];
const hash=bytes=>createHash('sha256').update(bytes).digest('hex');
const originalHash='f0d93dbf9d5af3e4b15ea86b0959297230db28b6c4e69f2f84451bd4b7321699';
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1440,height:900},acceptDownloads:true});
page.on('pageerror',e=>errors.push(e.message));
page.on('response',r=>{if(r.status()===404&&r.url().startsWith(base))errors.push('404: '+r.url())});
async function open(route){
  await page.goto(base+route,{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.querySelector('main')&&!document.body.dataset.bpRoutePending&&!document.querySelector('.bp-route-loader.is-active'));
}
try{
  // Course and no-scheme filters must keep the added assessment discoverable.
  await open('#tests');
  await page.locator('[data-test-category="specialist-12"]').click();
  await page.locator('[data-test-search]').fill('Semester 2');
  await page.locator('[data-test-tech]').selectOption('Tech-free');
  await page.locator('[data-test-scheme]').selectOption('no');
  const card=page.locator(`[data-test-id="${id}"]`);
  await card.waitFor({state:'visible'});
  assert.equal(await page.locator('[data-test-visible]').innerText(),'1');
  await card.getByRole('link',{name:'View',exact:true}).click();
  await page.waitForSelector('.bp-test-detail-meta');
  const meta=page.locator('.bp-test-detail-meta');
  for(const [label,value] of [['Subject','Specialist Mathematics • Units 2'],['Reading','15 min'],['Writing','1 hr'],['Marks','50'],['Questions','10'],['Conditions','Tech-free']]){
    assert.equal(await meta.locator('span').filter({has:page.locator('small',{hasText:new RegExp('^'+label+'$')})}).locator('b').innerText(),value);
  }
  assert.match(await page.locator('.bp-test-scheme').innerText(),/not currently published/);
  assert.equal(await page.locator('a[href*="solutions/"]').count(),0);
  assert.equal(await page.locator('.bp-test-detail-hero').getByRole('link',{name:'Open paper'}).getAttribute('href'),paper.file);
  await page.waitForFunction(()=>{const img=document.querySelector('.bp-test-detail-cover img');return img?.complete&&img.naturalWidth>0});
  assert.equal(await page.locator('footer').getByText('v'+SITE.version,{exact:false}).count(),1);
  await page.screenshot({path:out+'/specialist-sem2-desktop.png',fullPage:true});
  // Exercise the actual download button and check byte-for-byte identity with the upload.
  const pending=page.waitForEvent('download');
  await page.locator('.bp-test-detail-hero').getByRole('link',{name:'Download'}).click();
  const download=await pending;
  const downloaded=await fs.readFile(await download.path());
  assert.equal(hash(downloaded),originalHash,'Downloaded paper differs from the supplied PDF');
  assert.equal(download.suggestedFilename(),'specialist-sem2-tech-free-2026.pdf');
  await page.locator('[data-test-bookmark]').click();
  await page.reload({waitUntil:'domcontentloaded'});
  await page.getByRole('button',{name:'★ Saved',exact:true}).waitFor();
  // Exact cover timing and all ten tracker rows must work for this paper.
  await page.getByRole('link',{name:'Start Exam Mode'}).click();
  await page.getByRole('button',{name:'Begin reading time'}).click();
  assert.match(await page.locator('[data-exam-clock]').innerText(),/^(15:00|14:5\d)$/);
  assert.equal(await page.locator('[data-exam-question]').count(),10);
  await page.getByRole('button',{name:'Start writing now'}).click();
  assert.match(await page.locator('[data-exam-clock]').innerText(),/^(60:00|59:5\d)$/);
  await page.getByRole('button',{name:'Pause',exact:true}).click();
  await page.locator('[data-exam-question="10"]').click();
  await page.locator('[data-tracker-notes]').fill('Review roots of unity');
  await page.locator('[data-tracker-flagged]').click();
  await page.reload({waitUntil:'domcontentloaded'});
  await page.locator('[data-tracker-notes]').waitFor();
  assert.equal(await page.locator('[data-tracker-notes]').inputValue(),'Review roots of unity');
  assert.equal(await page.locator('[data-tracker-flagged]').getAttribute('aria-pressed'),'true');
  assert.equal(await page.locator('[data-exam-toggle]').innerText(),'Resume');
  // Vault and command search use the same paper, with no invented solution resource.
  await open('#resources');
  await page.locator('#vault-course').selectOption('specialist-12');
  await page.locator('#vault-search').fill('Semester 2');
  const resource=page.locator(`[data-resource="vault-test-${id}"]`);
  await resource.waitFor({state:'visible'});
  assert.equal(await resource.getByRole('link',{name:'Open',exact:true}).getAttribute('href'),paper.file);
  assert.equal(await page.locator('#vault-count').innerText(),'1');
  await open('#search');
  await page.locator('[data-command-group="Tests"]').click();
  await page.getByRole('searchbox',{name:'Search Brainpower'}).fill(paper.title);
  await page.locator(`#bp-command-results a[href="#test/${id}"]`).waitFor({state:'visible'});
  await page.setViewportSize({width:390,height:844});
  await open('#test/'+id);
  await page.waitForSelector('.bp-test-detail-meta');
  await page.waitForTimeout(500);
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,'Mobile paper detail overflows');
  await page.screenshot({path:out+'/specialist-sem2-mobile.png',fullPage:true});
  assert.deepEqual(errors,[]);
  const report={status:'PASS',version:SITE.version,url:base+'#test/'+id,downloadBytes:downloaded.length,sha256:originalHash,checks:['Tests course/search/conditions/scheme filters','verified metadata and actual cover','original PDF download integrity','saved assessment','reading/writing timing and ten-question tracker restoration','resource Vault','command search','mobile detail'],errors};
  await fs.writeFile(out+'/report.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
}finally{await browser.close()}
