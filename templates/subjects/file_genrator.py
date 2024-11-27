# Open the template file
with open('template.html', 'r') as template_file:
    template_content = template_file.read()

# Create 10 files with content from the template
for i in range(1, 11):
    with open(f'{i}.html', 'w') as new_file:
        new_file.write(template_content)
    print(f'{i}.html created successfully!')
