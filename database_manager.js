var mysql = require('mysql')
require('dotenv').config()

var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE
});

// function db_connection(crud, table) {
//     connection.query('SELECT * FROM ' + table, function (err, rows, fields) {
//         if (err) throw err
//
//         console.log(rows)
//     })
// }

module.exports = {

    db_push: function ()
    {

    },

    db_pull: function () {

    },

    pushSession: function (utiliaztion_array,
                           total_time,
                           averages_array, lead_time,
                           planning_algorithm,
                           service_level,
                           session_name,
                           time_per_piece,
                           time_per_piece_per_machine_array) {

        var query = 'UPDATE sessions SET averageFgi =' + averages_array.FGI +', averageInv =' + averages_array.INV +
        ', averageWip=' + averages_array.WIP +', average_utilisation=' + averages_array.average_utilisation +
        ', planningAlgoritm="' + planning_algorithm + '", serviceLevel=' + service_level +
        ', sessionName="' + session_name + '", timePerPiece=' + time_per_piece +
        ', timePerPiece_M1=' + time_per_piece_per_machine_array.m1 + ', timePerPiece_M2=' + time_per_piece_per_machine_array.m2 +
        ', timePerPiece_M3=' + time_per_piece_per_machine_array.m3 + ', timePerPiece_M4=' + time_per_piece_per_machine_array.m4 +
        ', timePerPiece_M5=' + time_per_piece_per_machine_array.m5 +
        ', utilisation_M1=' + utiliaztion_array.m1 + ', utilisation_M2=' + utiliaztion_array.m2 +
        ', utilisation_M3=' + utiliaztion_array.m3 + ', utilisation_M4=' + utiliaztion_array.m4 +
        ', utilisation_M5=' + utiliaztion_array.m5
        + ', total_time =' + total_time + ' ' +
            'ORDER BY id DESC LIMIT 1';

        console.log(query);
        connection.query(query, function (err, rows, fields) {
            if (err) throw err

            console.log(rows)
        })
    },

    getParameters: function () {
        var parameters = [];
        connection.query('SELECT *'+ /*+
            '' +
            'MRPparameters_0, MRPparameters_1,'+
            'MRPparameters_2, MRPparameters_3, MRPparameters_4, MRPparameters_5,'+
            'MRPparameters_6,MRPparameters_7,MRPparameters_8,MRPparameters_9,'+
            'MRPparameters_10,MRPparameters_11,MRPparameters_11,MRPparameters_12'+
            'MRPparameters_13,MRPparameters_14,MRPparameters_15,MRPparameters_16'+
            'MRPparameters_17,MRPparameters_18,MRPparameters_19,MRPparameters_20'+
            'MRPparameters_21,MRPparameters_22,MRPparameters_23'+ */
            'FROM sessions', function(err, rows, fields) {
            if (err) throw err
            var i = rows.length-1;
            console.log("Latest row in DB is: " + rows.length);
            console.log('ssA0: ' + rows[i].MRPparameters_1);
            parameters.push({
                ssA0: rows[i].MRPparameters_0, ssB0: rows[i].MRPparameters_1, ssC0: rows[i].MRPparameters_2,
                ssD0: rows[i].MRPparameters_3, ssD1: rows[i].MRPparameters_4, ssE0: rows[i].MRPparameters_5,
                ssE1: rows[i].MRPparameters_6, ssE2: rows[i].MRPparameters_7, lsA0: rows[i].MRPparameters_8,
                lsB0: rows[i].MRPparameters_9, lsC0: rows[i].MRPparameters_10, lsD0: rows[i].MRPparameters_11,
                lsD1: rows[i].MRPparameters_12, lsE0: rows[i].MRPparameters_13, lsE1: rows[i].MRPparameters_14,
                lsE2: rows[i].MRPparameters_15, ltA0: rows[i].MRPparameters_16, ltB0: rows[i].MRPparameters_17,
                ltC0: rows[i].MRPparameters_18, ltD0: rows[i].MRPparameters_19, ltD1: rows[i].MRPparameters_20,
                ltE0: rows[i].MRPparameters_21, ltE1: rows[i].MRPparameters_22, ltE2: rows[i].MRPparameters_23

            });
            console.log(rows[0]);
        })

        return parameters;
    },

    getCostReq: function () {
        var costReqArray = [];


        connection.query('SELECT * FROM cost_reqs', function (err, rows, fields) {
            if (err) throw err

            //console.log(rows)

            for(var i = 0; i < rows.length; i++){

                costReqArray.push({time: rows[i].time,amount: rows[i].amount,product: rows[i].product});
            }
        })

        //console.log(costReqArray);


        return costReqArray;
    }
}