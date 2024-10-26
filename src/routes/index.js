const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const NodeCache = require('node-cache');
const authMiddleware = require('../middleware/authMiddleware');

const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

async function getData() {
  if (cache.has('apiData')) {
    return cache.get('apiData');
  }
  
  const data = await fs.readFile(path.join(__dirname, '../data.json'), 'utf8');
  const apiData = JSON.parse(data);
  cache.set('apiData', apiData);
  return apiData;
}

router.use(authMiddleware);
// Authorization: Bearer token

router.get('/', (req, res) => {
  res.send({ message: 'Hello world' });
});



// http://localhost:3000/get/data?search=security&sort=API:asc&filter=Category:Security&page=2&limit=10
router.get('/get/data', async (req, res) => {
  const { search, sort, filter, page = 1, limit = 10 } = req.query;
  let apiData = await getData();

  // Search
  if (search) {
    apiData = apiData.filter(item => 
      Object.values(item).some(value => 
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }

  // Filter
  if (filter) {
    const [key, value] = filter.split(':');
    apiData = apiData.filter(item => item[key] && item[key].toString().toLowerCase() === value.toLowerCase());
  }

  // Sort
  if (sort) {
    const [key, order] = sort.split(':');
    apiData.sort((a, b) => {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedData = apiData.slice(startIndex, endIndex);

  res.json({
    total: apiData.length,
    page: parseInt(page),
    limit: parseInt(limit),
    data: paginatedData
  });
});

module.exports = router;
