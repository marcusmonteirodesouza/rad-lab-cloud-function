const functions = require('@google-cloud/functions-framework');
const { PubSub } = require('@google-cloud/pubsub');

functions.http('launchRadLab', async (req, res) => {
  const pubsub = new PubSub();

  const { module } = req.body;

  switch (module) {
    case 'alpha-fold':
      await launchAlphaFold(pubsub);
      return res.status(201).json({});
    case 'data-science':
      await launchDataScience(pubsub);
      return res.status(201).json({});
    case 'genomics-cromwell':
      await launchGenomicsCromwell(pubsub);
      return res.status(201).json({});
    case 'genomics-dsub':
      await launchGenomicsDSub(pubsub);
      return res.status(201).json({});
    case 'silicon-design':
      await launchSiliconDesign(pubsub);
      return res.status(201).json({});
    default:
      return res.status(400).json(`Not implemented for module ${module}`);
  }
});

/**
 * Launches a RAD Lab alpha_fold module
 * @param {PubSub} pubsub
 */
async function launchAlphaFold(pubsub) {
  const topic = pubsub.topic('rad-lab-launch-alpha-fold');
  const data = Buffer.from(JSON.stringify({}));
  await topic.publishMessage({ data });
}

/**
 * Launches a RAD Lab data_science module
 * @param {PubSub} pubsub
 */
async function launchDataScience(pubsub) {
  const topic = pubsub.topic('rad-lab-launch-data-science');
  const data = Buffer.from(JSON.stringify({}));
  await topic.publishMessage({ data });
}

/**
 * Launches a RAD Lab genomics_cromwell module
 * @param {PubSub} pubsub
 */
async function launchGenomicsCromwell(pubsub) {
  const topic = pubsub.topic('rad-lab-launch-genomics-cromwell');
  const data = Buffer.from(JSON.stringify({}));
  await topic.publishMessage({ data });
}

/**
 * Launches a RAD Lab genomics_dsub module
 * @param {PubSub} pubsub
 */
async function launchGenomicsDSub(pubsub) {
  const topic = pubsub.topic('rad-lab-launch-genomics-dsub');
  const data = Buffer.from(JSON.stringify({}));
  await topic.publishMessage({ data });
}

/**
 * Launches a RAD Lab silicon_design module
 * @param {PubSub} pubsub
 */
async function launchSiliconDesign(pubsub) {
  const topic = pubsub.topic('rad-lab-launch-silicon-design');
  const data = Buffer.from(JSON.stringify({}));
  await topic.publishMessage({ data });
}
