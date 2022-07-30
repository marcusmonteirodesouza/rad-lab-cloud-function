const functions = require('@google-cloud/functions-framework');
const { PubSub } = require('@google-cloud/pubsub');

functions.http('launchRadLab', async (req, res) => {
  const pubsub = new PubSub();

  const { module } = req.body;

  switch (module) {
    case 'data-science':
      await launchDataScience(pubsub);
      return res.status(201).json({});
    default:
      return res.status(400).json(`Not implemented for module ${module}`);
  }
});

/**
 * Launches a RAD Lab data_science module
 * @param {PubSub} pubsub
 */
async function launchDataScience(pubsub) {
  const topic = pubsub.topic('rad-lab-launch-data-science');
  const data = Buffer.from(JSON.stringify({}));
  await topic.publishMessage({ data });
}
