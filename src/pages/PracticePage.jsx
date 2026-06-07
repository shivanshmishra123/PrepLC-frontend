import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import config from "../config";
const PracticePage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [companies, setCompanies] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const pageSize = 20;

  // Filters
  const [searchCompany, setSearchCompany] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
    fetchAllQuestions();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/companies`);
      if (response.ok) {
        const data = await response.json();
        setCompanies(data);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const fetchAllQuestions = async (
    timeFrame = "all",
    page = 0,
    append = false,
  ) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      let url = `${config.apiUrl}/api/questions?page=${page}&size=${pageSize}`;
      if (timeFrame && timeFrame !== "all") {
        url += `&timeFrame=${timeFrame}`;
      }

      const token = localStorage.getItem("token");
      console.log("TOKEN:", token);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Normalize data - ensure each question appears only once with all companies
        const normalized = data.questions.map((q) => ({
          id: q.id,
          leetcodeId: q.id,
          title: q.title,
          companies: q.companyQuestions
            ? Array.from(
                new Set(q.companyQuestions.map((cq) => cq.company.name)),
              )
            : [],
          difficulty: q.difficulty,
          url: q.url,
        }));

        if (append) {
          setQuestions((prev) => [...prev, ...normalized]);
        } else {
          setQuestions(normalized);
        }

        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setHasMore(data.hasMore);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const fetchCompanyQuestions = async (companyId, page = 0, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      let url = `${config.apiUrl}/api/companies/${companyId}/questions?page=${page}&size=${pageSize}`;
      if (selectedTimeframe !== "all") {
        url += `&timeFrame=${selectedTimeframe}`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // Normalize data - group questions and ensure all companies are shown
        // Create a map to ensure unique questions
        const questionMap = new Map();

        data.questions.forEach((cq) => {
          const question = cq.question;
          if (!questionMap.has(question.id)) {
            questionMap.set(question.id, {
              id: question.id,
              leetcodeId: question.id,
              title: question.title,
              companies: question.companyQuestions
                ? Array.from(
                    new Set(
                      question.companyQuestions.map(
                        (innerCq) => innerCq.company.name,
                      ),
                    ),
                  )
                : [cq.company.name],
              difficulty: question.difficulty,
              url: question.url,
            });
          }
        });

        const normalized = Array.from(questionMap.values());

        if (append) {
          setQuestions((prev) => [...prev, ...normalized]);
        } else {
          setQuestions(normalized);
        }

        setCurrentPage(data.currentPage);
        setTotalPages(data.totalPages);
        setHasMore(data.hasMore);
      }
    } catch (error) {
      console.error("Error fetching company questions:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleApplyFilters = () => {
    // Reset pagination when applying filters
    setCurrentPage(0);

    if (searchCompany) {
      const company = companies.find(
        (c) => c.name.toLowerCase() === searchCompany.toLowerCase(),
      );
      if (company) {
        fetchCompanyQuestions(company.id, 0, false);
      } else {
        // Company not found, maybe show empty or alert
        alert("Company not found");
      }
    } else {
      fetchAllQuestions(selectedTimeframe, 0, false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;

    if (searchCompany) {
      const company = companies.find(
        (c) => c.name.toLowerCase() === searchCompany.toLowerCase(),
      );
      if (company) {
        fetchCompanyQuestions(company.id, nextPage, true);
      }
    } else {
      fetchAllQuestions(selectedTimeframe, nextPage, true);
    }
  };

  // Client-side filtering for difficulty (since backend doesn't support it yet combined with others easily)
  const filteredQuestions = questions.filter((q) => {
    if (selectedDifficulty === "all") return true;
    return q.difficulty === selectedDifficulty;
  });

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className="min-h-screen text-white font-sans"
      style={{ background: "linear-gradient(to bottom, #1F0C2F, #0A0A0A)" }}
    >
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5 backdrop-blur-md sticky top-0 z-50">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-white">
          PrepLC
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span>{user?.name}</span>
            </button>
            {/* Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-dark-card border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pt-2">
              <div className="p-2">
                <Link
                  to="/profile"
                  className="block w-full text-left px-4 py-2 hover:bg-white/5 rounded text-sm"
                >
                  My Profile
                </Link>
                <Link
                  to="/leetcode-stats"
                  className="block w-full text-left px-4 py-2 hover:bg-white/5 rounded text-sm"
                >
                  LeetCode Stats
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-white/5 rounded text-sm text-red-400"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Practice Arena</h1>
          <p className="text-white/60">
            Master your interview skills with targeted questions.
          </p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Company..."
              className="w-full bg-dark/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary text-white placeholder-white/40"
              value={searchCompany}
              onChange={(e) => setSearchCompany(e.target.value)}
              onFocus={() => setShowCompanyDropdown(true)}
              onBlur={() =>
                setTimeout(() => setShowCompanyDropdown(false), 200)
              }
            />
            {showCompanyDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-dark-card border border-white/10 rounded-lg shadow-xl z-10 max-h-48 overflow-y-auto">
                {companies
                  .filter(
                    (c) =>
                      searchCompany === "" ||
                      c.name
                        .toLowerCase()
                        .includes(searchCompany.toLowerCase()),
                  )
                  .map((company) => (
                    <button
                      key={company.id}
                      className="w-full text-left px-4 py-2 hover:bg-white/5 text-sm text-white/80 hover:text-white transition-colors"
                      onClick={() => {
                        setSearchCompany(company.name);
                        setShowCompanyDropdown(false);
                      }}
                    >
                      {company.name}
                    </button>
                  ))}
                {companies.filter(
                  (c) =>
                    searchCompany === "" ||
                    c.name.toLowerCase().includes(searchCompany.toLowerCase()),
                ).length === 0 && (
                  <div className="px-4 py-2 text-sm text-white/50">
                    No companies found
                  </div>
                )}
              </div>
            )}
          </div>

          <select
            className="bg-dark/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary text-white appearance-none cursor-pointer"
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="three-months">Last 3 Months</option>
            <option value="six-months">Last 6 Months</option>
            <option value="more-than-six-months">&gt; 6 Months</option>
            <option value="thirty-days">Last 30 Days</option>
          </select>

          <select
            className="bg-dark/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-primary text-white appearance-none cursor-pointer"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <button
            onClick={handleApplyFilters}
            className="bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-lg transition-all shadow-lg shadow-primary/20"
          >
            Apply Filters
          </button>
        </div>

        {/* Table */}
        <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-white/70 text-sm uppercase tracking-wider">
                  <th className="p-4 font-medium">ID</th>
                  <th className="p-4 font-medium">Title</th>
                  <th className="p-4 font-medium">Companies</th>
                  <th className="p-4 font-medium">Difficulty</th>
                  <th className="p-4 font-medium text-center">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-white/50">
                      Loading questions...
                    </td>
                  </tr>
                ) : (
                  filteredQuestions.map((q) => (
                    <tr
                      key={q.id}
                      className="hover:bg-white/5 transition-colors group"
                    >
                      <td className="p-4 text-white/60">#{q.leetcodeId}</td>
                      <td className="p-4 font-medium text-white group-hover:text-primary-light transition-colors">
                        {q.title}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-2">
                          {q.companies.slice(0, 8).map((company, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80 border border-white/5"
                            >
                              {company}
                            </span>
                          ))}
                          {q.companies.length > 8 && (
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary-light border border-primary/30 font-medium">
                              +{q.companies.length - 8}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${
                            q.difficulty === "Easy"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : q.difficulty === "Medium"
                                ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <a
                          href={q.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block"
                        >
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/LeetCode_logo_black.png/640px-LeetCode_logo_black.png"
                            alt="LeetCode"
                            className="w-8 h-8 cursor-pointer mx-auto"
                          />
                        </a>
                        {/* <a
                                                    href={q.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-primary hover:text-white transition-all text-white/50"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                        <polyline points="15 3 21 3 21 9"></polyline>
                                                        <line x1="10" y1="14" x2="21" y2="3"></line>
                                                    </svg>
                                                </a> */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Load More Button */}
        {!loading && hasMore && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="bg-primary hover:bg-primary-hover text-white font-medium py-3 px-8 rounded-lg transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Load More"
              )}
            </button>
          </div>
        )}

        {/* Pagination Info */}
        {!loading && questions.length > 0 && (
          <div className="mt-4 text-center text-white/60 text-sm">
            Showing {questions.length} questions
            {totalPages > 0 && ` • Page ${currentPage + 1} of ${totalPages}`}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PracticePage;
