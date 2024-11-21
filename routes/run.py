from app import create_app, db
from app.models import Subject, Chapter

app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'Subject': Subject, 'Chapter': Chapter}

if __name__ == '__main__':
    app.run(debug=True)