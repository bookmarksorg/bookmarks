export type BookInfo = {
    image: string;
    title: string;
    sinopses?: string;
    author: string;
    pages: number;
    language: string;
    year: number;
    genres: Record<string, string>[];
    rating: number;
    ratingUsers: string;
};

export const books: Record<string, BookInfo> = {
    n3ui4tn3tm: {
        image: "https://m.media-amazon.com/images/I/91LptBSFxQL._AC_UF1000,1000_QL80_.jpg",
        title: "Percy Jackson and the Olympians: The Lightning Thief",
        author: "Rick Riordan",
        pages: 237,
        language: "English",
        year: 2005,
        genres: [
            { name: "Fantasy", color: "bg-green-500/90" },
            { name: "Young Adult", color: "bg-yellow-500/90" },
            { name: "Adventure", color: "bg-teal-500/90" },
        ],
        rating: 3.4,
        ratingUsers: "3.288",
    },
    g6h34ui3w4: {
        image: "https://m.media-amazon.com/images/I/81tM68Xn66L._AC_UF1000,1000_QL80_.jpg",
        title: "Star Wars: The High Republic: Light of the Jedi",
        author: "Charles Soule",
        pages: 427,
        language: "English",
        year: 2021,
        genres: [
            { name: "Science Fiction", color: "bg-blue-500/90" },
            { name: "Fantasy", color: "bg-green-500/90" },
        ],
        rating: 4.8,
        ratingUsers: "631",
    },
    m53ynos09g: {
        image: "https://m.media-amazon.com/images/I/A1oURyPAO2L._AC_UF1000,1000_QL80_.jpg",
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J. K. Rowling",
        pages: 309,
        language: "English",
        year: 1997,
        genres: [
            { name: "Fantasy", color: "bg-green-500/90" },
            { name: "Magic", color: "bg-yellow-500/90" },
        ],
        rating: 2.3,
        ratingUsers: "5.231",
    },
    z7b8w0fkh0: {
        image: "https://m.media-amazon.com/images/I/91k68MKPbNL._AC_UF1000,1000_QL80_.jpg",
        title: "Oyasumi Punpun",
        author: "Inio Asano",
        pages: 164,
        language: "Japanese",
        year: 2007,
        genres: [
            { name: "Drama", color: "bg-red-500/90" },
            { name: "Slice of Life", color: "bg-yellow-500/90" },
            { name: "Psychological", color: "bg-purple-500/90" },
            { name: "Seinen", color: "bg-blue-500/90" },
        ],
        rating: 5.0,
        ratingUsers: "666.666",
    },
    c3x5jiogs9: {
        image: "https://m.media-amazon.com/images/I/614SwlZNtJL._AC_UF1000,1000_QL80_.jpg",
        title: "The Hunger Games",
        author: "Suzanne Collins",
        pages: 526,
        language: "English",
        year: 2008,
        genres: [
            { name: "Science Fiction", color: "bg-blue-500/90" },
            { name: "Young Adult", color: "bg-yellow-500/90" },
            { name: "Adventure", color: "bg-teal-500/90" },
        ],
        rating: 4.2,
        ratingUsers: "923",
    },
};
