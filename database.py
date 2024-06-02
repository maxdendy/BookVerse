from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker

Base = declarative_base()


class Books(Base):
    __tablename__ = 'Books'

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String)
    author = Column(String)
    publishing = Column(String)
    ISBN = Column(String)


class Prices(Base):
    __tablename__ = 'Prices'

    book_id = Column(Integer, primary_key=True, unique=False)
    price = Column(String)
    date = Column(DateTime)
    store = Column(String)
    url = Column(String)


class Database:
    def __init__(self, db_url):
        self.engine = create_engine(db_url)
        Base.metadata.create_all(bind=self.engine)
        self.Session = sessionmaker(autoflush=False, bind=self.engine)

    def get_books(self, prompt):
        with self.Session() as db:
            data = []

            querry = db.query(Books).filter(
                Books.title == prompt[0]
            ).all()

            for q in querry:
                prices = self.get_prices(q.id)
                data.append({
                    'title': q.title,
                    'author': q.author,
                    'publishing': q.publishing,
                    'isbn': q.ISBN,
                    'prices': prices,
                })

            return data

    def get_prices(self, index):
        with self.Session() as db:
            prices = []

            querry = db.query(Prices).filter(Prices.book_id == index).all()

            for q in querry:
                prices.append({
                    'store': q.store,
                    'price': q.price,
                    'url': q.url,
                })

            return prices
