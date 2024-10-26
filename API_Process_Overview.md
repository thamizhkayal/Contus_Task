
# API Process Overview

The process begins with a login where users send a **POST** request to `/auth/login` with mock credentials (`{id: 1, username: 'thamizh'}`). Upon successful login, the server responds with a token. This token allows users to make secure requests to other endpoints, like `/get/data`, by including it in the `Authorization` header as `Bearer <token>`.

Once authenticated, users can retrieve data from the **GET** `/get/data` endpoint. Here, they can refine the data using several query filters:

1. **Search Filter**: This option helps find specific data by keywords. For example, `search=security` limits results to items related to “security.”

2. **Category Filter**: Users can filter data by category, such as `filter=Category:Security`, which shows only items in the "Security" category.

3. **Sort Filter**: To organize results, users can specify a field and order, like `sort=API:asc`, which sorts items by the "API" field in ascending order.

4. **Pagination Filters (Page and Limit)**: These control the number of results shown per page. For instance, `page=2&limit=10` retrieves the second page with 10 items per page.
