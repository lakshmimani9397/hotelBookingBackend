var express = require('express');
var router = express.Router();
var connect = require('./connection');


// get cityList
router.route('/getCities')
.get((req, res) => {
    console.log('inside fetch cities')
    var sql_getCities = `select * from hb_cities;`

    connect.connection()
        .then((con) => {
            con.query(sql_getCities, (err, result) => {
                con.release();
                if (err) {
                    console.log('Error while fetching cities', err.stack);
                    res.json({ status: -1 });
                }
                else {
                   console.log('response in fetch cities',result);
                   res.json({status:1,cities:result})
                }
            })
        })
        .catch((e) => {
            console.log('Error in DB connection:', e);
            res.json({ status: -2 });
        })

})

// get Department list
router.route('/getDepartments')
.get((req, res) => {
    console.log('inside getDepartments')
    var sql_getDepartments = `select * from hb_departments;`

    connect.connection()
        .then((con) => {
            con.query(sql_getDepartments, (err, result) => {
                con.release();
                if (err) {
                    console.log('Error while getDepartments', err.stack);
                    res.json({ status: -1 });
                }
                else {
                   console.log('response in getDepartments',result);
                   res.json({status:1,departments:result})
                }
            })
        })
        .catch((e) => {
            console.log('Error in DB connection:', e);
            res.json({ status: -2 });
        })

})

//get Team List
router.route('/getTeams')
.get((req, res) => {
    console.log('inside getTeams')
    var sql_getTeams = `select * from hb_teams;`

    connect.connection()
        .then((con) => {
            con.query(sql_getTeams, (err, result) => {
                con.release();
                if (err) {
                    console.log('Error while getTeams', err.stack);
                    res.json({ status: -1 });
                }
                else {
                   console.log('response in getTeams',result);
                   res.json({status:1,teams:result})
                }
            })
        })
        .catch((e) => {
            console.log('Error in DB connection:', e);
            res.json({ status: -2 });
        })
})

//get Designation List
router.route('/getDesignations')
.get((req, res) => {
    console.log('inside getDesignations')
    var sql_getDesignations = `select * from hb_designation;`

    connect.connection()
        .then((con) => {
            con.query(sql_getDesignations, (err, result) => {
                con.release();
                if (err) {
                    console.log('Error while getDesignations', err.stack);
                    res.json({ status: -1 });
                }
                else {
                   console.log('response in getDesignations',result);
                   res.json({status:1,designations:result})
                }
            })
        })
        .catch((e) => {
            console.log('Error in DB connection:', e);
            res.json({ status: -2 });
        })
})


//get Employee List
router.route('/getEmployees')
.get((req, res) => {
    console.log('inside getEmployees')
    var sql_getEmployees = `select t1.*,t2.*,t3.*,t4.* from hb_employee t1 join hb_designation t2
    on t1.designationId=t2.designationId join hb_teams t3
    on t1.teamId=t3.teamId join hb_departments t4
    on t1.departmentId=t4.departmentId;;`

    connect.connection()
        .then((con) => {
            con.query(sql_getEmployees, (err, result) => {
                con.release();
                if (err) {
                    console.log('Error while getEmployees', err.stack);
                    res.json({ status: -1 });
                }
                else {
                   console.log('response in getEmployees',result);
                   res.json({status:1,employees:result})
                }
            })
        })
        .catch((e) => {
            console.log('Error in DB connection:', e);
            res.json({ status: -2 });
        })
})

router.route('/getHotels')
    .get((req, res) => {
        console.log('inside getHotels')
        var sql_getHotels = `select t1.*,t2.*,t3.* from hb_hotels t1 join hb_accessibility t2
        on t1.hotelId=t2.hotelId
        right join hb_amenities t3
        on t1.hotelId=t3.hotelId where cityId=1;`

        // var sql_getHotels=`select * from hb_hotels where cityId=1;`


        connect.connection()
            .then((con) => {
                con.query(sql_getHotels, (err, result) => {
                    con.release();
                    if (err) {
                        console.log('Error while getHotels', err.stack);
                        res.json({ status: -1 });
                    }
                    else {
                        console.log('response in getHotels', result);
                        // let hotelid=result[0].hotelId;
                        // console.log('hotel id---',hotelid)
                        res.json({ status: 1, status: result })
                    }
                })
            })
            .catch((e) => {
                console.log('Error in DB connection:', e);
                res.json({ status: -2 });
            })

    })

module.exports = router;
