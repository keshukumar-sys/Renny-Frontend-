import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Newsletter from '../../components/Newsletter';
import PageSpinner from '../../components/PageSpinner.jsx';
import SEO from '../../components/SEO.jsx';
import SchemaMarkup from '../../components/SchemaMarkup.jsx';
import { API_BASE_URL } from '../../lib/api';

// Validates schema format for proper JSON-LD structure
const validateSchema = (schema) => {
  if (!schema) return { valid: false, error: 'No schema provided' };

  try {
    // Check if it's proper JSON-LD
    if (typeof schema === 'string') {
      JSON.parse(schema);
    } else if (typeof schema !== 'object') {
      return { valid: false, error: 'Schema must be JSON object' };
    }

    // Check required fields for BlogPosting
    if (schema['@type'] === 'BlogPosting') {
      if (!schema.headline) return { valid: false, error: 'Missing headline' };
      if (!schema['@context'])
        return { valid: false, error: 'Missing @context' };
    }

    return { valid: true };
  } catch (err) {
    return { valid: false, error: `Invalid JSON: ${err.message}` };
  }
};

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openRelatedIndex, setOpenRelatedIndex] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      window.scrollTo(0, 0);
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/api/blogs/${slug}`);
        console.log('Blog Response:', res.data.data);

        // Validate schema
        const validation = validateSchema(res.data.data.structuredData);
        if (!validation.valid) {
          console.warn(`⚠️ Schema validation warning: ${validation.error}`);
        } else {
          console.log('✅ Schema validation passed');
        }

        console.log('Structured Data:', res.data.data.structuredData);
        setBlog(res.data.data);

        const listRes = await axios.get(`${API_BASE_URL}/api/blogs`);
        const others = listRes.data.data
          .filter((b) => b.slug !== slug)
          .slice(0, 5);
        setRelatedBlogs(others);
      } catch (err) {
        console.error('Error loading blog:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [slug]);

  if (loading) return (
    <>
      <SEO 
        title="Loading Blog | Renny Strips"
        url={`https://rennystrips.com/blog/${slug}`} 
      />
      <PageSpinner />
    </>
  );
  if (!blog)
    return (
      <div className="h-screen flex items-center justify-center font-helvetica">
        <SEO title="Blog Not Found | Renny Strips" />
        Blog not found.
      </div>
    );

  const headings =
    blog.bodySections
      ?.filter((section) => section.type === 'heading')
      .map((section) => section.content) || [];

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

  return (
    <>
      <SchemaMarkup schema={blog.structuredData} />
      <SEO
        title={blog.seoTitle || `Blog | Renny Strips`}
        description={
          blog.seoDescription ||
          'Explore steel industry insights, manufacturing trends, engineering expertise, and industrial updates from Renny Strips.'
        }
        keywords={
          blog.seoKeywords ||
          'Renny Strips blog, steel industry insights, manufacturing trends, industrial articles, engineering blogs'
        }
        url={`https://rennystrips.com/blog/${slug}`}
      />
      <div className="font-helvetica bg-white">
        {/* 1. Hero Header */}
        <div className="flex flex-col items-center px-6 pt-16">
          <div className="flex flex-col gap-3 max-w-5xl text-left">
            {/* Blog Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[55px] font-bold text-blue leading-tight tracking-tight">
              {blog.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-sm sm:text-sm font-medium mb-10 text-gray-500">
              <time>
                {new Date(
                  blog.date || blog.publishedAt || blog.createdAt
                ).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
              <span className="text-gray-400 select-none" aria-hidden="true">
                •
              </span>
              <Link
                to="/"
                className="text-blue-highlight text-sm sm:text-sm font-bold hover:text-blue transition-colors duration-200"
              >
                Renny Strips Ltd
              </Link>
            </div>
          </div>
          <img
            src={blog.mainImage}
            alt={blog.title}
            className="w-full object-cover max-w-5xl rounded-xl shadow-lg"
          />
        </div>

        {/* 2. THREE COLUMN LAYOUT - items-start is critical for sticky behavior */}
        <div className="max-w-[1440px] mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10 items-start">
          {/* LEFT SIDE: Table of Contents */}
          <aside className="hidden lg:block w-1/4 xl:w-1/5 z-100 sticky top-24 pr-6 self-start h-fit">
            <div className="border-l-2 border-gray-100 pl-4">
              <h4 className="font-bold text-blue mb-6 uppercase text-sm tracking-[0.2em]">
                Table Of Contents
              </h4>
              <nav className="flex flex-col gap-4">
                {headings.map((heading, i) => (
                  <a
                    key={i}
                    href={`#${slugify(heading)}`}
                    className="text-gray-500 hover:text-blue-900 hover:font-bold text-sm font-medium transition-all duration-300 ease-in-out hover:translate-x-1"
                  >
                    {heading}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* MIDDLE: Main Content */}
          <main className="w-full lg:w-3/5">
            {blog.excerpt && (
              <p className="mb-8 leading-relaxed text-lg md:text-xl text-gray-800 italic border-l-4 border-blue-900 pl-4">
                {blog.excerpt}
              </p>
            )}

            <div className="space-y-3">
              {blog.bodySections?.map((section, index) => {
                const prevType =
                  index > 0 ? blog.bodySections[index - 1].type : null;
                const isConsecutiveParagraphs =
                  section.type === 'paragraph' && prevType === 'paragraph';
                const isConsecutiveSubPoints =
                  section.type === 'sub-point' && prevType === 'sub-point';
                const isParagraphToSubPoint =
                  section.type === 'sub-point' && prevType === 'paragraph';
                const isSubPointToParagraph =
                  section.type === 'paragraph' && prevType === 'sub-point';

                let wrapperClass = '';
                if (isConsecutiveParagraphs) {
                  wrapperClass = '!mt-2';
                } else if (isConsecutiveSubPoints) {
                  wrapperClass = '!mt-0';
                } else if (isParagraphToSubPoint) {
                  wrapperClass = '!mt-1';
                } else if (isSubPointToParagraph) {
                  wrapperClass = '!mt-2';
                }

                return (
                  <div key={index} className={wrapperClass}>
                    {/* HEADINGS */}
                    {section.type === 'heading' && (
                      <h2
                        id={slugify(section.content)}
                        className="mt-10 text-blue hover:text-blue-900 transition-colors text-xl md:text-2xl font-bold scroll-mt-28 mb-4"
                      >
                        {section.content}
                      </h2>
                    )}

                    {/* SUB HEADING */}
                    {section.type === 'sub-heading' && (
                      <h3 className="mt-6 mb-3 text-lg md:text-xl font-semibold text-blue">
                        {section.content}
                      </h3>
                    )}

                    {/* PARAGRAPHS */}
                    {section.type === 'paragraph' && (
                      <p className="leading-relaxed text-gray-700 text-base md:text-lg mb-3">
                        {section.content}
                      </p>
                    )}

                    {/* SUB POINT */}
                    {section.type === 'sub-point' && (
                      <p className="text-gray-700 text-base md:text-lg mb-1">
                        {section.content}
                      </p>
                    )}

                    {/* Bullet & Numbered Lists */}
                    {(section.type === 'bullet-list' ||
                      section.type === 'numbered-list') && (
                      <div className="mb-6">
                        {section.type === 'bullet-list' ? (
                          <ul className="list-disc ml-6 space-y-4 text-gray-700 text-base md:text-lg">
                            {section.listItems?.map((item, i) => (
                              <li key={i} className="pl-2">
                                {typeof item === 'object' ? (
                                  <>
                                    <strong className="text-blue">
                                      {item.title}
                                    </strong>{' '}
                                    {item.descriptions &&
                                    item.descriptions.length > 0 ? (
                                      <div className="space-y-2 mt-2">
                                        {item.descriptions.map((desc, dIdx) => (
                                          <p
                                            key={dIdx}
                                            className="leading-relaxed text-gray-700 text-sm md:text-base"
                                          >
                                            {desc}
                                          </p>
                                        ))}
                                      </div>
                                    ) : (
                                      item.description
                                    )}
                                  </>
                                ) : (
                                  item
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ol className="list-decimal ml-6 space-y-4 text-gray-700 text-base md:text-lg">
                            {section.listItems?.map((item, i) => (
                              <li key={i} className="pl-2">
                                {typeof item === 'object' ? (
                                  <>
                                    <strong className="text-blue">
                                      {item.title}
                                    </strong>{' '}
                                    {item.descriptions &&
                                    item.descriptions.length > 0 ? (
                                      <div className="space-y-2 mt-2">
                                        {item.descriptions.map((desc, dIdx) => (
                                          <p
                                            key={dIdx}
                                            className="leading-relaxed text-gray-700 text-sm md:text-base"
                                          >
                                            {desc}
                                          </p>
                                        ))}
                                      </div>
                                    ) : (
                                      item.description
                                    )}
                                  </>
                                ) : (
                                  item
                                )}
                              </li>
                            ))}
                          </ol>
                        )}
                      </div>
                    )}

                    {/* IMAGES */}
                    {section.type === 'image' && (
                      <figure className="my-8">
                        <img
                          src={section.url || section.image}
                          alt={section.caption || section.content || 'Blog Image'}
                          className="w-full object-cover rounded-lg shadow-sm"
                        />
                        {(section.caption || section.content) && (
                          <figcaption className="text-center text-sm text-gray-400 mt-2">
                            {section.caption || section.content}
                          </figcaption>
                        )}
                      </figure>
                    )}

                    {/* TABLE */}
                    {section.type === 'table' && (
                      <div className="overflow-x-auto my-6">
                        {typeof section.table === 'string' ? (
                          <div
                            dangerouslySetInnerHTML={{ __html: section.table }}
                            className="table-auto w-full text-left prose prose-table:border-collapse prose-td:border prose-th:border prose-td:p-2 prose-th:p-2"
                          />
                        ) : Array.isArray(section.table) ? (
                          <table className="min-w-full border-collapse border border-gray-300">
                            <tbody>
                              {section.table.map((row, rIdx) => (
                                <tr
                                  key={rIdx}
                                  className={
                                    rIdx === 0 ? 'bg-gray-100 font-bold' : ''
                                  }
                                >
                                  {Array.isArray(row) ? (
                                    row.map((cell, cIdx) => (
                                      <td
                                        key={cIdx}
                                        className="border border-gray-300 px-4 py-2"
                                      >
                                        {cell}
                                      </td>
                                    ))
                                  ) : (
                                    <td className="border border-gray-300 px-4 py-2">
                                      {JSON.stringify(row)}
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : section.table &&
                          typeof section.table === 'object' &&
                          section.table.rows ? (
                          <table className="min-w-full border-collapse border border-gray-300">
                            {section.table.headers && (
                              <thead className="bg-gray-100">
                                <tr>
                                  {section.table.headers.map((h, i) => (
                                    <th
                                      key={i}
                                      className="border border-gray-300 px-4 py-2 text-left"
                                    >
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                            )}
                            <tbody>
                              {section.table.rows.map((row, rIdx) => (
                                <tr key={rIdx}>
                                  {Array.isArray(row) ? (
                                    row.map((cell, cIdx) => (
                                      <td
                                        key={cIdx}
                                        className="border border-gray-300 px-4 py-2"
                                      >
                                        {cell}
                                      </td>
                                    ))
                                  ) : (
                                    <td className="border border-gray-300 px-4 py-2">
                                      {JSON.stringify(row)}
                                    </td>
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : section.content ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: section.content,
                            }}
                            className="table-auto w-full text-left prose prose-table:border-collapse prose-td:border prose-th:border prose-td:p-2 prose-th:p-2"
                          />
                        ) : (
                          <div className="p-4 border border-dashed border-gray-300 text-gray-500 text-center">
                            Table data is empty or invalid.
                          </div>
                        )}
                      </div>
                    )}

                    {/* HTML BLOCK — raw HTML, rendered as-is */}
                    {section.type === 'html' && section.content && (
                      <div
                        className="leading-relaxed text-gray-700 text-base md:text-lg mb-3 prose prose-a:text-blue-highlight prose-a:font-bold prose-a:underline"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {/* Contact Us CTA */}
            <div className="flex items-center justify-center w-full px-4 sm:px-6">
              <div className="w-full sm:max-w-md md:max-w-lg relative overflow-hidden rounded-3xl mt-10 bg-gray-100 p-6 sm:p-8 shadow-xl">
                {/* Premium abstract structural overlay representing steel geometry */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px]" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Header & Icon */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-blue leading-snug mb-3">
                      Need Help Choosing the Right Product?
                    </h3>

                    <p className="text-xs sm:text-sm text-blue leading-relaxed font-normal mb-6">
                      Have questions about pricing, technical details, or bulk
                      orders? Get in touch with our team.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 w-full">
                    {/* Primary Button */}
                    <Link
                      to="/contact-us"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300/50 bg-white px-4 py-3 text-sm font-medium text-blue transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-100 shadow-sm hover:shadow-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-4 h-4 text-blue"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                      <span>Contact Us</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* RIGHT SIDE */}
          <aside className="w-full lg:w-1/4 xl:w-1/5 static lg:sticky top-24 self-start">
            {/* RIGHT SIDE: Related Posts */}
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <h4 className="font-bold text-gray-800 mb-4 border-b pb-2 text-sm uppercase tracking-wider">
                Recent Blogs
              </h4>
              <div className="flex flex-col gap-2">
                {relatedBlogs.map((rel, idx) => (
                  <div
                    key={rel._id}
                    className="border-b border-gray-200 last:border-0"
                  >
                    <button
                      onClick={() =>
                        setOpenRelatedIndex(
                          openRelatedIndex === idx ? null : idx
                        )
                      }
                      className="w-full py-3 text-left flex justify-between items-center text-sm font-medium text-gray-700 hover:text-blue-900 transition-colors"
                    >
                      <span className="truncate pr-2">{rel.title}</span>
                      <span className="text-gray-400">
                        {openRelatedIndex === idx ? '−' : '+'}
                      </span>
                    </button>

                    {openRelatedIndex === idx && (
                      <div className="pb-4 animate-in fade-in slide-in-from-top-1 duration-300">
                        <Link to={`/blog/${rel.slug}`} className="group block">
                          <img
                            src={rel.mainImage}
                            alt="Blog Img"
                            className="w-full h-32 object-cover rounded-md mb-2 shadow-sm group-hover:opacity-90 transition-opacity"
                          />
                          <p className="text-xs font-bold text-blue group-hover:underline">
                            Read Article →
                          </p>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6 relative overflow-hidden rounded-2xl bg-blue p-5 shadow-xl group/sidebar">
              {/* Header Section */}
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <h4 className="font-bold text-white border-b mb-4 text-md uppercase tracking-wider">
                    Explore Products
                  </h4>
                </div>
              </div>

              {/* Product Links List */}
              <div className="relative z-10 flex flex-col gap-2.5">
                {[
                  {
                    name: 'ERW Pipes & Tubes',
                    slug: '/erw-pipes-and-tubes',
                    code: 'ERW',
                  },
                  {
                    name: 'Scaffolding & Formwork System',
                    slug: '/scaffolding-formwork',
                    code: 'SF',
                  },
                  {
                    name: 'Narrow Width HR Coils',
                    slug: '/narrow-hrcoil',
                    code: 'HR',
                  },
                  {
                    name: 'Wire Rods',
                    slug: '/wire-rods',
                    code: 'WR',
                  },
                  {
                    name: 'MS Billets',
                    slug: '/ms-billets',
                    code: 'MS',
                  },
                ].map((product) => (
                  <Link
                    key={product.slug}
                    to={product.slug}
                    className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3.5 backdrop-blur-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:border-blue-400/30 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-blue-950/50 cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0 pr-2">
                      <span className="truncate text-sm font-semibold text-slate-100 group-hover:text-white transition-colors duration-200">
                        {product.name}
                      </span>
                    </div>

                    {/* Dynamic Animated Arrow Icon */}
                    <div className="text-blue-400/70 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:text-blue-300 shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 4.5l7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-20 bg-gray-100">
          <Newsletter />
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
