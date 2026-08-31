import { Link } from 'react-router-dom';

const BlogCard = ({ to, image, alt, title, date, excerpt }) => {
  return (
    <Link
      to={to}
      className="group bg-white  shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col"
    >
      {/* Blog Image */}
      <img src={image} alt={alt} className="w-full h-64 object-cover" />

      {/* Blog Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <h2 className="text-xl font-semibold text-blue group-hover:text-blue-800 transition">
          {title}
        </h2>

        {/* Date */}
        <span className="block text-sm text-gray-500 mt-2 font-bold ">
          {date}
        </span>

        {/* Excerpt */}
        <p className="text-gray-600 mt-4 line-clamp-4">{excerpt}</p>

        {/* Read More */}
        <span className="inline-block mt-4 font-medium text-blue group-hover:text-blue-800 transition">
          Read More →
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;
