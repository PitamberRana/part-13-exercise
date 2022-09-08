CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text NOT NULL,
    url text NOT NULL,
    title text NOT NULL,
    likes INTEGER DEFAULT 0
);

insert into blogs (author,url,title) values ('macBook', 'google.com','garib manxey');
insert into blogs (author,url,title) values('Hari Bahadur', 'wikipedia.org','fateko jutta');
insert into blogs (author,url,title) values ('Madan Bahadur', 'google.com','dhungey mutu');

select * from blogs;