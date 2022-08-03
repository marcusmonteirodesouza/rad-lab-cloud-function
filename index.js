const functions = require('@google-cloud/functions-framework');
const { PubSub } = require('@google-cloud/pubsub');
const { Firestore } = require('@google-cloud/firestore');
const Joi = require('joi');

functions.http('launchScienceModule', async (req, res) => {
  const requestBodySchema = Joi.object().keys({
    module: Joi.string()
      .valid(
        'rad-lab-alpha-fold',
        'rad-lab-data-science',
        'rad-lab-genomics-cromwell',
        'rad-lab-genomics-dsub',
        'rad-lab-silicon-design',
        'hpc-toolkit-hpc-cluster-small'
      )
      .required(),
    requester: Joi.object()
      .keys({
        email: Joi.string().email().required(),
      })
      .required(),
  });

  const { value: requestBody, error } = requestBodySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: { message: error.message } });
  }

  const firestore = new Firestore();
  const radLabRequestsCollection = firestore.collection(
    'science-comp-launch-requests'
  );
  const documentReference = await radLabRequestsCollection.add(requestBody);
  const requestId = documentReference.id;

  const pubsub = new PubSub();

  switch (requestBody.module) {
    case 'rad-lab-alpha-fold':
      await launchRadLabAlphaFold(pubsub, requestId);
      break;
    case 'rad-lab-data-science':
      await launchRadLabDataScience(pubsub, requestId);
      break;
    case 'rad-lab-genomics-cromwell':
      await launchRadLabGenomicsCromwell(pubsub, requestId);
      break;
    case 'rad-lab-genomics-dsub':
      await launchRadLabGenomicsDSub(pubsub, requestId);
      break;
    case 'rad-lab-silicon-design':
      await launchRadLabSiliconDesign(pubsub, requestId);
      break;
    case 'hpc-toolkit-hpc-cluster-small':
      await launchHpcToolkitHpcClusterSmall(pubsub, requestId);
      break;
    default:
      return res
        .status(400)
        .json({ error: { message: `Not implemented for module ${module}` } });
  }

  return res.status(201).json({ requestId });
});

/**
 * Launches a RAD Lab alpha_fold module
 * @param {PubSub} pubsub
 * @param {string} requestId
 */
async function launchRadLabAlphaFold(pubsub, requestId) {
  const topic = pubsub.topic('launch-rad-lab-alpha-fold');
  const data = Buffer.from(JSON.stringify({ requestId }));
  await topic.publishMessage({ data });
}

/**
 * Launches a RAD Lab data_science module
 * @param {PubSub} pubsub
 * @param {string} requestId
 */
async function launchRadLabDataScience(pubsub, requestId) {
  const topic = pubsub.topic('launch-rad-lab-data-science');
  const data = Buffer.from(JSON.stringify({ requestId }));
  await topic.publishMessage({ data });
}

/**
 * Launches a RAD Lab genomics_cromwell module
 * @param {PubSub} pubsub
 * @param {string} requestId
 */
async function launchRadLabGenomicsCromwell(pubsub, requestId) {
  const topic = pubsub.topic('launch-rad-lab-genomics-cromwell');
  const data = Buffer.from(JSON.stringify({ requestId }));
  await topic.publishMessage({ data });
}

/**
 * Launches a RAD Lab genomics_dsub module
 * @param {PubSub} pubsub
 * @param {string} requestId
 */
async function launchRadLabGenomicsDSub(pubsub, requestId) {
  const topic = pubsub.topic('launch-rad-lab-genomics-dsub');
  const data = Buffer.from(JSON.stringify({ requestId }));
  await topic.publishMessage({ data });
}

/**
 * Launches a RAD Lab silicon_design module
 * @param {PubSub} pubsub
 * @param {string} requestId
 */
async function launchRadLabSiliconDesign(pubsub, requestId) {
  const topic = pubsub.topic('launch-rad-lab-silicon-design');
  const data = Buffer.from(JSON.stringify({ requestId }));
  await topic.publishMessage({ data });
}

/**
 * Launches a HPC Toolkit hpc-small-cluster module
 * @param {PubSub} pubsub
 * @param {string} requestId
 */
async function launchHpcToolkitHpcClusterSmall(pubsub, requestId) {
  const topic = pubsub.topic('launch-hpc-toolkit-hpc-cluster-small');
  const data = Buffer.from(JSON.stringify({ requestId }));
  await topic.publishMessage({ data });
}
