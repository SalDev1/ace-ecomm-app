class ApiFeatures {
  // Query is anything that comes after ?  in the url.
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    // Got the keyword name :- samosa
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i",
          },
        }
      : {};

    // console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.querystr };
    // Removing some fields for category.
    const removeFields = ["keyword", "page", "limit"];

    // Filtering out the keywords present in the url by checking
    // in the removeFields.
    removeFields.forEach((key) => delete queryCopy[key]);

    // Creating a range of prices :- 1200 to 2000;
    // We are using price[gt] = 1200 , price[lt] = 2000;
    // console.log(queryCopy);

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    console.log(queryStr);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage) {
    // How many products will be there in a single page.
    // console.log(this.querystr.page);
    const currentPage = Number(this.querystr.page) || 1; //50

    const skip = resultPerPage * (currentPage - 1);
    // This wiil help us to put a limit , instead of showing all the products.
    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default ApiFeatures;
