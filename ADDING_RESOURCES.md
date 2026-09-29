# Adding Brainpower Resources

## 1. Put the file in the correct folder

Example:

`public/resources/specialist-12/tests/my-new-test.pdf`

Recommended folders:

- `public/resources/methods-12/`
- `public/resources/methods-34/`
- `public/resources/specialist-12/`
- `public/resources/specialist-34/`

Inside each course, use folders such as `tests`, `solutions`, `notes`, and `worksheets`.

## 2. Add its metadata

V1 keeps the resource catalogue near the top of `app.js` in the `resources` array. Copy an existing record and change its fields.

Fields include title, subject, units, topic, difficulty, marks, duration, technology conditions, type and file path.

## 3. Commit and push

Once hosted through GitHub, pushing the changed files can automatically redeploy the website depending on the hosting provider.

## Future upgrade

The catalogue should eventually be moved into standalone JSON files when the resource collection becomes large. The UI has been structured so that transition is straightforward.
