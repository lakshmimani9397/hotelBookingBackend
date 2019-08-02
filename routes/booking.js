var express = require('express');
var router = express.Router();
var connect = require('./connection');


// get cityList
router.route('/bookingDetails')
    .post((req, res) => {
        console.log('inside bookingDetails', req.body)
        let bookingDate = new Date();
        // req.body = {
        //     hotelId: 10,
        //     employeeId: 1,
        //     fromDate: '2019-08-02',
        //     toDate: '2019-08-05',
        //     travelers: [2, 3, 4],
        //     pax: 2
        // }
        var sql_bookingDetails = `CALL HB_HOTEL_BOOKING(?,?,?,?,?,?,?,@bookingref,@error_code,@error_desc)`
        var sql_datafields = [req.body.hotelId, req.body.employeeId, req.body.fromDate, req.body.toDate, bookingDate, req.body.travelers, req.body.pax];
        var select_bookingDetails = `select @bookingref,@error_code,@error_desc;`
        console.log('data foelds in booking',sql_datafields)
        connect.connection()
            .then((con) => {
                con.query(sql_bookingDetails, sql_datafields, (err, result) => {
                    if (err) {
                        con.release();
                        console.log('Error while bookingDetails', err.stack);
                        res.json({ status: -1 });
                    }
                    else {
                        con.query(select_bookingDetails, (err, results) => {
                            con.release();
                            if (err) {
                                console.log('Error while bookingDetails', err.stack);
                                res.json({ status: -1 });
                            }
                            else {
                                console.log('response in bookingDetails', result,'results--',results);
                                res.json({ status: 1,bookingRef:results[0]['@bookingref']})
                            }
                        })
                    }
                })
            })
            .catch((e) => {
                console.log('Error in DB connection:', e);
                res.json({ status: -2 });
            })

    })

module.exports = router;
