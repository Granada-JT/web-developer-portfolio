const View = require("../models/View");

module.exports.saveViewCounts = async (req, res) => {
    let { ipaddress } = req.body;
  
    if (!ipaddress) {
        ipaddress = 'No IP Address Available';
    }

    try {
        
      // Find the latest view with the same IP address
      const latestView = await View.findOne({ ipaddress }).sort('-visitedOn');
  
      // If a view exists and it was visited on the same day, update the totalViews
      if (latestView && isSameDay(latestView.visitedOn, new Date())) {
        latestView.totalViews += 1;
        await latestView.save();
      } else {
        // Create a new view document
        await View.create({ totalViews: 1, ipaddress });
      }
  
      res.sendStatus(200);
    } catch (error) {
      console.error('Error recording visit:', error);
      res.sendStatus(500);
    }
  };
  
  function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
