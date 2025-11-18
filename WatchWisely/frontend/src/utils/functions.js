export const optimizeSearchResults = (data) => {
    if (data.length === 0) return [];

    // Filter the results that don't have Poster URL
    const filteredData = data.filter(item => item.poster_path && item.poster_path.trim() !== '')

    // IMDB Standard Weighted Rating Formula. It is industry standard for ranking movies.
    // Formula: (v/(v+m)) * R + (m/(v+m)) * C
    // Where:
    // R = movie's vote_average
    // v = vote_count
    // C = global average rating
    // m = minimum votes required to be considered (you choose)
    const C = filteredData.reduce((acc, item) => acc + item.vote_average, 0) / filteredData.length;
    const m = 500; // You can adjust this threshold based on your dataset

    const optimizedData = filteredData.map((item) => {
        const R = item.vote_average;
        const v = item.vote_count;
        const weightedRating = (v / (v + m)) * R + (m / (v + m)) * C;
        return { ...item, weightedRating };
    });

    // Sort by weighted rating in descending order
    optimizedData.sort((a, b) => b.weightedRating - a.weightedRating);
    return optimizedData;
}