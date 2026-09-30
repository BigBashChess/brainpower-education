# Adding Brainpower resources

The website is designed so PDFs and resource metadata are separate from the UI.

## 1. Put the file in the correct folder

Examples:

```text
public/resources/methods-12/tests/
public/resources/methods-12/solutions/
public/resources/methods-12/notes/
public/resources/methods-12/worksheets/

public/resources/methods-34/...
public/resources/specialist-12/...
public/resources/specialist-34/...
```

Use simple file names such as:

```text
integration-practice-test-2.pdf
integration-practice-test-2-solutions.pdf
```

Avoid spaces in file names.

## 2. Add tests to `src/data/tests.js`

Example:

```js
{
  id: 'integration-practice-test-2',
  title: 'Integration Practice Test 2',
  subject: 'Specialist Mathematics',
  units: '3 & 4',
  course: 'specialist-34',
  topics: ['Integration'],
  difficulty: 'Advanced',
  tech: 'Tech-free',
  year: 2026,
  reading: 5,
  minutes: 40,
  marks: 30,
  questions: 6,
  file: 'public/resources/specialist-34/tests/integration-practice-test-2.pdf',
  solutionFile: 'public/resources/specialist-34/solutions/integration-practice-test-2-solutions.pdf',
  thumbnail: 'public/thumbnails/integration-practice-test-2.jpg',
  description: 'Short description of what the assessment covers.',
  dateAdded: '2026-09-30'
}
```

That makes the test appear in the Test Centre, test pages and global search.

## 3. Add general resources to `src/data/resources.js`

Example:

```js
{
  id: 'integration-summary-sheet',
  title: 'Integration Summary Sheet',
  type: 'Notes',
  course: 'methods-34',
  subject: 'Mathematical Methods',
  units: '3 & 4',
  topics: ['Integration'],
  difficulty: 'Core',
  file: 'public/resources/methods-34/notes/integration-summary.pdf',
  thumbnail: 'public/thumbnails/integration-summary.jpg',
  description: 'Integration rules and common exact antiderivatives.'
}
```

## 4. Adding questions

Questions live in `src/data/questions.js`.

Supported types in the current engine:

- `numeric`
- `text`
- `choice`

A numeric question can include `tolerance`.

Text questions can include multiple accepted forms using `answers`.

## 5. Adding lessons

Lessons live in `src/data/lessons.js` and reference question IDs.

A lesson should include:

- course
- topic
- title
- summary
- short explanation
- one key formula
- worked-thinking steps
- question IDs
- XP

The course map updates automatically from this data.

## 6. Thumbnails

Place thumbnails in:

```text
public/thumbnails/
```

A portrait image matching an A4 cover works best.

## Important

Do not paste passwords, GitHub tokens or private API keys into project files. This website does not currently require any secrets.
