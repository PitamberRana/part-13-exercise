CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text NOT NULL,
    Url text NOT NULL,
    title text NOT NULL,
    likes INTEGER DEFAULT 0
);

insert into blogs (author,url,title) values ('macBook', 'google.com','garib manxey');
insert into blogs (author,url,title) values('Hari Bahadur', 'wikipedia.org','fateko jutta');

select * from blogs;