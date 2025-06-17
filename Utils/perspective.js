const axios = require('axios');

const analyzeToxicity = async (text) => {
  const response = await axios.post(
    'https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze',
    {
      comment: { text },
      languages: ['en'],
      requestedAttributes: { TOXICITY: {} }
    },
    {
      params: { key: process.env.PERSPECTIVE_API_KEY }
    }
  );

  return response.data.attributeScores.TOXICITY.summaryScore.value;
};

module.exports = analyzeToxicity;
