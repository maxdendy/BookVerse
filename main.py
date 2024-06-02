from fastapi import FastAPI, Body
from fastapi.responses import FileResponse

import uvicorn

from database import Database
from settings import Settings

app = FastAPI()
database = Database(Settings.db_url)


#  получение скриптов и стилей
@app.get('/js/{path}', response_class=FileResponse)
def js(path):
    return f'scripts/{path}'


@app.get('/css/{path}', response_class=FileResponse)
def css(path):
    return f'styles/{path}'


#  получение главной страницы
@app.get('/', response_class=FileResponse)
def homepage():
    return 'index.html'


#  отправка данных клиенту
@app.post('/post')
def post(data=Body()):
    prompt = [data['title'], data['author'], data['publishing'], data['isbn']]
    return {'books': database.get_books(prompt)}


if __name__ == '__main__':
    uvicorn.run(
        app,  # подключение к fastapi
        host='0.0.0.0',  # адрес 0.0.0.0 означает, что сервер будет работать на всех доступных интерфейсах
        port=80  # стандартный порт для http-приложений
    )
