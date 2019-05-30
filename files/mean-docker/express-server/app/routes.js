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
            name: req.body.name,
            password: req.body.password,
            done: false
        }, function (err, user) {
            if (err)
                res.send(err);

            getUsers(res);
        });
    });

    app.post('/api/login', function (req, res) {
        // create a todo, information comes from AJAX request from Angular
        User.find({
            name: req.body.name,
            password: req.body.password,
        }, function (err, user) {
            if (err)
                res.send(err);
            res.json(user)
        });
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
        User.find({
            name: req.body.name,
            password: req.body.password,
        }, function (err, user1) {
            if (user1.length != 0) {
                let oldBalance = Number(user1[0].balance)
                let amount = Number(req.body.amount)
                if (amount < 0)
                    amount = 0
                User.update({
                    name: req.body.name,
                    password: req.body.password,
                }, {
                    $set: {
                        'balance': oldBalance + amount
                    }
                }, function () {
                    User.find({
                            name: req.body.name,
                            password: req.body.password,
                        },
                        function (err, user2) {
                            res.json(user2)
                        })
                })
            }
        });
    })

    app.post('/api/withdraw', function (req, res) {
        // 取钱
        // req.body.amount
        User.find({
            name: req.body.name,
            password: req.body.password,
        }, function (err, user1) {
            if (user1.length != 0) {
                let oldBalance = Number(user1[0].balance)
                let amount = Number(req.body.amount)
                if (amount < 0)
                    amount = 0
                if (amount >= oldBalance)
                    amount = oldBalance
                User.update({
                    name: req.body.name,
                    password: req.body.password,
                }, {
                    $set: {
                        'balance': oldBalance - amount
                    }
                }, function () {
                    User.find({
                            name: req.body.name,
                            password: req.body.password,
                        },
                        function (err, user2) {
                            res.json(user2)
                        })
                })
            }

        });
    })

    app.post('/api/transfer', function (req, res) {
        // 转账
        // req.body.amount
        User.find({
            name: req.body.name,
            password: req.body.password,
        }, function (err, user1) {
            if (user1.length != 0) {
                User.find({
                    name: req.body.receiver,
                }, function (err, user2) {
                    if (user2.length != 0) {
                        let oldBalance1 = Number(user1[0].balance)
                        let oldBalance2 = Number(user2[0].balance)
                        let amount = Number(req.body.amount)
                        if (amount < 0)
                            amount = 0
                        if (amount >= oldBalance1)
                            amount = oldBalance1
                        User.update({
                            name: req.body.name,
                        }, {
                            $set: {
                                'balance': oldBalance1 - amount
                            }
                        }, function () {
                            User.update({
                                name: req.body.receiver,
                            }, {
                                $set: {
                                    'balance': oldBalance2 + amount
                                }
                            }, function () {
                                User.find({
                                        name: req.body.name,
                                        password: req.body.password,
                                    },
                                    function (err, user2) {
                                        res.json(user2)
                                    })
                            })
                        });

                    }
                })
            }
        });
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