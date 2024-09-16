const app = require('./app');
const path = require('path');
const express= require('express');

const _dirname = path.resolve();

app.use(express.static(path.join(_dirname,"/Roxiler_FrontEnd/dist")))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(_dirname,"Roxiler_FrontEnd","dist","index.html"))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
