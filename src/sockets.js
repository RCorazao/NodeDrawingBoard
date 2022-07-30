const lines = require('../models/lines');

module.exports = async(io) => {
    var line_history;
       
    io.on('connection', async(socket) => {
        console.log('new user connected');
        // Extracción de datos de la base de datos
        try{
            line_history = await lines.find();
            //console.log(line_history[0].line[0].x);
        } catch (error) {
            console.log(error);
        }

        for(let i in line_history){
            socket.emit('draw_line', line_history[i]);
        }

        socket.on('draw_line', data => {
            //line_history.push(data.line);
            var lines1 = new lines({
                line: [
                    {x: data.line[0].x, y: data.line[0].y},
                    {x: data.line[1].x, y: data.line[1].y}
                ],
                dataline: {
                    color: data.dataline.color,
                    thickness: data.dataline.thickness
                }
            });
 
            // save model to database
            lines1.save(function (err, line) {
            if (err) return console.error(err);
            //console.log("saved to bookstore collection.");
            });
            io.emit('draw_line', data);
        });
    });
}