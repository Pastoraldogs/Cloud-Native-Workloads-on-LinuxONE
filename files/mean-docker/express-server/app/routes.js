var Todo = require('./models/todo');
var User = require('./models/user')

function getTodos(res) {
    Todo.find(function (err, todos) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(todos); // return all todos in JSON format
    });
};

function getUsers(res) {
    User.find(function (err, users) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(users); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            value: req.body.value,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        })

    });

    app.post('/api/createUser', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        User.create({
            name: req.body.user,
            password: req.body.password,
            done: false
        }, function (err, user) {
            if (err)
                res.send(err);

            getUsers(res);
        });
    });


    app.get('/api/login', function (req, res) {
        // 查询数据库，用户名是否存在，以及密码是否匹配
        // req.body.name
        // req.body.password
        // res.send() 返回true 或者 false
    });



    app.get('/api/info', function (req, res) {
        // 查询数据库，根据用户名
        // req.body.name
        // res.send() 返回余额，理财金额
        User.find(function (err, users) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }
            res.json(users); // return all todos in JSON format
        });
    })

    app.post('/api/deposit', function (req, res) {
        // 存钱
        // req.body.amount
    })

    app.post('/api/withdraw', function (req, res) {
        // 取钱
        // req.body.amount
    })

    app.post('/api/buy', function (req, res) {
        // 购买理财产品

    })



    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });


    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};