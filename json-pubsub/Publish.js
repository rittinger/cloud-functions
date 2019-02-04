'use strict';
 
const {PubSub} = require('@google-cloud/pubsub');
 
const publisher = new PubSub()
                .topic("jsonTopic")
                .publisher();
 
exports.publish = (req, res) => {
 
  // Convert request message to JSON for pubsub
  const jsonMessage = {
    data: {
      message: req.query.message
    },
  };
  const dataBuffer = Buffer.from(
    JSON.stringify(jsonMessage)
  );
 
  // Publishe the message
  return publisher
   .publish(dataBuffer)
    .then(() => res.status(200).send('Message published.'))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
      return Promise.reject(err);
    });
};