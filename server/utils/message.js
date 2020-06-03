var genmessage=(from ,text)=>{
    return{
        from,
        text,
        createdAt: new Date().getTime()
    };
};

var genLocationmessage=(from,latitude,longitude)=>{
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    }
}

module.exports={genmessage,genLocationmessage};