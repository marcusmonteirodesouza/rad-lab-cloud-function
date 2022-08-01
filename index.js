const functions = require('@google-cloud/functions-framework');
const { PubSub } = require('@google-cloud/pubsub');
const { Firestore, FieldValue } = require('@google-cloud/firestore');
const Joi = require('joi');

functions.http('launchRadLab', async (req, res) => {
  const requestBodySchema = Joi.object().keys({
    module: Joi.string()
      .valid(
        'alpha-fold',
        'data-science',
        'genomics-cromwell',
        'genomics-dsub',
        'silicon-design'
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
  const radLabRequestsCollection = firestore.collection('rad-lab-requests');
  const documentReference = await radLabRequestsCollection.add({
    ...requestBody,
    requestedAt: FieldValue.serverTimestamp(),
  });
  const requestId = documentReference.id;

  const pubsub = new PubSub();

  switch (requestBody.module) {
    case 'alpha-fold':
      await launchAlphaFold(pubsub, requestId);
      break;
    case 'data-science':
      await launchDataScience(pubsub, requestId);
      break;
    case 'genomics-cromwell':
      await launchGenomicsCromwell(pubsub, requestId);
      break;
    case 'genomics-dsub':
      await launchGenomicsDSub(pubsub, requestId);
      break;
    case 'silicon-design':
      await launchSiliconDesign(pubsub, requestId);
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
async function launchAlphaFold(pubsub, requestId) {
  const topic = pubsub.topic('rad-lab-launch-alpha-fold');
  const data = Buffer.from(JSON.stringify({ requestId }));
  await topic.publishMessage({ data });
}

/**
 * Launches a RAD Lab data_science module
 * @param {PubSub} pubsub
 * @param {string} requestId
 */
async function launchDataScience(pubsub, requestId) {
  const topic = pubsub.topic('rad-lab-launch-data-science');
  const data = Buffer.from(JSON.stringify({ requestId }));
  await topic.publishMessage({ data });
}

/**
 * Launches a RAD Lab genomics_cromwell module
 * @param {PubSub} pubsub
 * @param {string} requestId
 */
async function launchGenomicsCromwell(pubsub, requestId) {
  const topic = pubsub.topic('rad-lab-launch-genomics-cromwell');
  const data = Buffer.from(JSON.stringify({ requestId }));
  await topic.publishMessage({ data });
}

/**
 * Launches a RAD Lab genomics_dsub module
 * @param {PubSub} pubsub
 * @param {string} requestId
 */
async function launchGenomicsDSub(pubsub, requestId) {
  const topic = pubsub.topic('rad-lab-launch-genomics-dsub');
  const data = Buffer.from(JSON.stringify({ requestId }));
  await topic.publishMessage({ data });
}

/**
 * Launches a RAD Lab silicon_design module
 * @param {PubSub} pubsub
 * @param {string} requestId
 */
async function launchSiliconDesign(pubsub, requestId) {
  const topic = pubsub.topic('rad-lab-launch-silicon-design');
  const data = Buffer.from(JSON.stringify({ requestId }));
  await topic.publishMessage({ data });
}
