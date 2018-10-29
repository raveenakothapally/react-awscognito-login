module.exports = processorChain => socket => async action => {
  if (!processorChain || !Array.isArray(processorChain)) {
    throw new Error("Param process chain has to be a valid array.");
  }

  const context = {};

  for (let i = 0; i < processorChain.length; i++) {
    await processorChain[i](action, context, socket);
  }
};
