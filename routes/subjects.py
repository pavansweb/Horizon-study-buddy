from flask import Blueprint, render_template, abort
from app.models import Subject, Chapter

bp = Blueprint('subjects', __name__, url_prefix='/subjects')

@bp.route('/<string:subject_name>')
def subject_chapters(subject_name):
    subject = Subject.query.filter_by(name=subject_name).first_or_404()
    return render_template('subject.html', subject=subject)

@bp.route('/<string:subject_name>/<int:chapter_id>')
def chapter_content(subject_name, chapter_id):
    subject = Subject.query.filter_by(name=subject_name).first_or_404()
    chapter = Chapter.query.filter_by(id=chapter_id, subject_id=subject.id).first_or_404()
    return render_template('chapter.html', subject=subject, chapter=chapter)