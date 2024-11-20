const fs = require('fs');
const path = require('path');
const grayMatter = require('gray-matter');

const inputDir = './cms/project'; // Path to your .md files
const outputFile = './public/projects.json'; // Path to output JSON file

const files = fs.readdirSync(inputDir);

const projects = files.map((file) => {
  const filePath = path.join(inputDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const matter = grayMatter(content);

  return {
    title: matter.data.title,
    slug: matter.data.slug,
    url: `/project/${matter.data.slug}`, // Generate the URL for each project
    createdOn: matter.data['created-on'],
    order: matter.data.f_order || 999, // Default order if not specified
  };
});

// Sort projects by `f_order` or `created-on`
projects.sort((a, b) => a.order - b.order || new Date(a.createdOn) - new Date(b.createdOn));

// Write the JSON file
fs.writeFileSync(outputFile, JSON.stringify(projects, null, 2));
console.log('Projects JSON generated successfully!');
