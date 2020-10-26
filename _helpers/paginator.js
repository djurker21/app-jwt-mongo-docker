module.exports = {getPagination, getPagingData};

function getPagination(page, size) {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
}

function getPagingData (data, page, limit) {
    const { count, rows } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(count / limit);
  
    return { totalItems: count, items: rows, totalPages, currentPage };
}