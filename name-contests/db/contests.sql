DROP DATABASE IF EXISTS name_contests;

create DATABASE name_contests;
USE name_contests;

drop view if exists total_votes_by_name;
drop table if exists votes;
drop table if exists names;
drop table if exists contests;
drop table if exists users;

create table users (
  id serial primary key,
  email varchar(128) not null,
  first_name varchar(128),
  last_name varchar(128),
  api_key varchar(128) not null unique,
  created_at timestamp not null default current_timestamp
);


create table contests (
  id serial primary key,
  code varchar(255) not null unique,
  title varchar(255) not null,
  description text,
  status varchar(10) not null default 'draft'
    check (status in ('draft', 'published', 'archived')),
  created_at timestamp not null default current_timestamp,
  created_by integer not null references users
);

create table names (
  id serial primary key,
  contest_id integer not null references contests,
  label varchar(255) not null,
  normalized_label varchar(255) not null,
  description text,
  created_at timestamp not null default current_timestamp,
  created_by integer not null references users,
  constraint unique_contest_label
    unique(contest_id, normalized_label)
);

create table votes (
  id serial primary key,
  name_id integer not null references names,
  up boolean not null,
  created_at timestamp not null default current_timestamp,
  created_by integer  not null references users,
  constraint user_can_vote_once_on_a_name
    unique(name_id, created_by)
);

INSERT INTO users (email,first_name,last_name,api_key)
VALUES
('samer@agilelabs.com','Samer','Buna','4242'),
('creative@mind.com','Creativ','Mind','0000');

INSERT INTO contests (code,title,description,status,created_by)
VALUES
('free-programming-books-sit','Free Programming Books Sit','A list of free online programming books, categorized by languages/topics','draft',1),
('visualize-most-popular-tweets','Visualize Most Popular Tweets','A site to constantly visualize the most popular tweets in your stream','published',1),
('entrepreneurs-looknig-for-partnership','Interview Entrepreneurs Looking For Partnership',NULL,'archived',1);

INSERT INTO names (contest_id,label,normalized_label,description,created_by)
VALUES
(1,'RootLib','rootlib','The Root Library',2),
(1,'The Free List','thefreelist',NULL,2),
(2,'PopTweet','poptweet',NULL,2),
(2,'TwitterScop','twitterscop',NULL,2);

INSERT INTO votes (name_id,up,created_by)
VALUES
(1,TRUE,1),
(1,TRUE,2),
(2,TRUE,1),
(2,FALSE,2),
(3,FALSE,1),
(3,FALSE,2),
(4,TRUE,1),
(4,TRUE,2);

create view total_votes_by_name as
select id as name_id,
  (select count(up) from votes v where v.name_id = n.id and up = true) as up,
  (select count(up) from votes v where v.name_id = n.id and up = false) as down
from names n;