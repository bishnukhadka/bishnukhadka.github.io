class AdvancedSearch {
  constructor() {
    this.posts = [];
    this.filteredPosts = [];
    this.searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    this.searchStats = JSON.parse(localStorage.getItem('searchStats') || '{}');
    
    this.initializeElements();
    this.loadData();
    this.bindEvents();
    this.initializeKeyboardShortcuts();
  }

  initializeElements() {
    this.searchInput = document.getElementById('search-input');
    this.clearSearch = document.getElementById('clear-search');
    this.toggleFilters = document.getElementById('toggle-filters');
    this.filtersPanel = document.getElementById('filters-panel');
    this.searchResults = document.getElementById('search-results');
    this.searchSuggestions = document.getElementById('search-suggestions');
    this.resultsHeader = document.getElementById('results-header');
    this.noResults = document.getElementById('no-results');
    this.searchStats = document.getElementById('search-stats');
    this.searchHistory = document.getElementById('search-history');
    this.historyItems = document.getElementById('history-items');
    
    // Filter elements
    this.searchType = document.getElementById('search-type');
    this.sortBy = document.getElementById('sort-by');
    this.dateFrom = document.getElementById('date-from');
    this.dateTo = document.getElementById('date-to');
    this.categoryFilters = document.getElementById('category-filters');
    this.tagCloud = document.getElementById('tag-cloud');
    this.fuzzySearch = document.getElementById('fuzzy-search');
    this.groupByCategory = document.getElementById('group-by-category');
    this.showExcerpts = document.getElementById('show-excerpts');
    this.resetFilters = document.getElementById('reset-filters');
    this.saveSearch = document.getElementById('save-search');
    
    this.suggestionIndex = -1;
    this.debounceTimer = null;
  }

  loadData() {
    try {
      const searchData = document.getElementById('search-data');
      const data = JSON.parse(searchData.textContent);
      this.posts = data.posts.map((post, index) => ({
        ...post,
        id: index,
        searchContent: this.createSearchContent(post)
      }));
      this.filteredPosts = [...this.posts];
      this.updateSearchStats();
    } catch (error) {
      console.error('Error loading search data:', error);
    }
  }

  createSearchContent(post) {
    return [
      post.title,
      post.category,
      post.tags.join(' '),
      post.excerpt,
      post.content
    ].join(' ').toLowerCase();
  }

  bindEvents() {
    // Search input events
    this.searchInput.addEventListener('input', (e) => this.handleSearchInput(e));
    this.searchInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
    this.searchInput.addEventListener('focus', () => this.showSuggestions());
    this.searchInput.addEventListener('blur', () => {
      setTimeout(() => this.hideSuggestions(), 200);
    });

    // Clear search
    this.clearSearch.addEventListener('click', () => this.clearSearchInput());

    // Toggle filters
    this.toggleFilters.addEventListener('click', () => this.toggleFiltersPanel());

    // Filter events
    this.searchType.addEventListener('change', () => this.performSearch());
    this.sortBy.addEventListener('change', () => this.performSearch());
    this.dateFrom.addEventListener('change', () => this.performSearch());
    this.dateTo.addEventListener('change', () => this.performSearch());
    this.fuzzySearch.addEventListener('change', () => this.performSearch());
    this.groupByCategory.addEventListener('change', () => this.performSearch());
    this.showExcerpts.addEventListener('change', () => this.performSearch());

    // Category and tag filters
    this.categoryFilters.addEventListener('click', (e) => this.handleCategoryClick(e));
    this.tagCloud.addEventListener('click', (e) => this.handleTagClick(e));

    // Actions
    this.resetFilters.addEventListener('click', () => this.resetAllFilters());
    this.saveSearch.addEventListener('click', () => this.saveCurrentSearch());

    // Document click to hide suggestions
    document.addEventListener('click', (e) => {
      if (!this.searchInput.contains(e.target) && !this.searchSuggestions.contains(e.target)) {
        this.hideSuggestions();
      }
    });
  }

  initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + K to focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.searchInput.focus();
      }
      
      // Escape to clear search
      if (e.key === 'Escape') {
        this.clearSearchInput();
        this.searchInput.blur();
      }
    });
  }

  handleSearchInput(e) {
    const query = e.target.value;
    
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      this.performSearch(query);
      this.generateSuggestions(query);
    }, 300);
  }

  handleKeyDown(e) {
    const suggestions = this.searchSuggestions.querySelectorAll('.suggestion-item');
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.suggestionIndex = Math.min(this.suggestionIndex + 1, suggestions.length - 1);
      this.updateSuggestionSelection(suggestions);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.suggestionIndex = Math.max(this.suggestionIndex - 1, -1);
      this.updateSuggestionSelection(suggestions);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (this.suggestionIndex >= 0 && suggestions[this.suggestionIndex]) {
        suggestions[this.suggestionIndex].click();
      } else {
        this.performSearch();
      }
    } else if (e.key === 'Escape') {
      this.hideSuggestions();
    }
  }

  updateSuggestionSelection(suggestions) {
    suggestions.forEach((item, index) => {
      item.classList.toggle('keyboard-active', index === this.suggestionIndex);
    });
  }

  generateSuggestions(query) {
    if (!query || query.length < 2) {
      this.hideSuggestions();
      return;
    }

    const suggestions = new Set();
    const queryLower = query.toLowerCase();

    // Add matching titles
    this.posts.forEach(post => {
      if (post.title.toLowerCase().includes(queryLower)) {
        suggestions.add({ text: post.title, type: 'title', post });
      }
    });

    // Add matching tags
    const allTags = new Set();
    this.posts.forEach(post => {
      post.tags.forEach(tag => {
        if (tag.toLowerCase().includes(queryLower)) {
          allTags.add(tag);
        }
      });
    });

    allTags.forEach(tag => {
      suggestions.add({ text: tag, type: 'tag' });
    });

    // Add matching categories
    const allCategories = new Set();
    this.posts.forEach(post => {
      if (post.category.toLowerCase().includes(queryLower)) {
        allCategories.add(post.category);
      }
    });

    allCategories.forEach(category => {
      suggestions.add({ text: category, type: 'category' });
    });

    this.displaySuggestions(Array.from(suggestions).slice(0, 8));
  }

  displaySuggestions(suggestions) {
    if (suggestions.length === 0) {
      this.hideSuggestions();
      return;
    }

    const html = suggestions.map(suggestion => `
      <div class="suggestion-item" data-text="${suggestion.text}" data-type="${suggestion.type}">
        <span class="suggestion-text">${this.highlightMatch(suggestion.text, this.searchInput.value)}</span>
        <span class="suggestion-type">${suggestion.type}</span>
      </div>
    `).join('');

    this.searchSuggestions.innerHTML = html;
    this.searchSuggestions.style.display = 'block';
    this.suggestionIndex = -1;

    // Bind suggestion clicks
    this.searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
      item.addEventListener('click', () => {
        const text = item.dataset.text;
        const type = item.dataset.type;
        
        if (type === 'title') {
          this.searchInput.value = text;
        } else if (type === 'tag') {
          this.toggleTag(text);
        } else if (type === 'category') {
          this.toggleCategory(text);
        }
        
        this.performSearch();
        this.hideSuggestions();
      });
    });
  }

  showSuggestions() {
    if (this.searchSuggestions.innerHTML && this.searchInput.value.length >= 2) {
      this.searchSuggestions.style.display = 'block';
    }
  }

  hideSuggestions() {
    this.searchSuggestions.style.display = 'none';
    this.suggestionIndex = -1;
  }

  performSearch(query = null) {
    query = query || this.searchInput.value;
    
    if (!query && !this.hasActiveFilters()) {
      this.displayAllPosts();
      return;
    }

    // Add to search history
    if (query && query.length > 0) {
      this.addToSearchHistory(query);
    }

    let results = [...this.posts];

    // Apply text search
    if (query) {
      results = this.searchPosts(results, query);
    }

    // Apply filters
    results = this.applyFilters(results);

    // Sort results
    results = this.sortResults(results, query);

    this.filteredPosts = results;
    this.displayResults(results, query);
    this.updateSearchStats(query, results.length);
  }

  searchPosts(posts, query) {
    const searchType = this.searchType.value;
    const useFuzzy = this.fuzzySearch.checked;
    const queryLower = query.toLowerCase();

    return posts.filter(post => {
      let searchFields = [];
      
      switch (searchType) {
        case 'title':
          searchFields = [post.title];
          break;
        case 'tags':
          searchFields = post.tags;
          break;
        case 'content':
          searchFields = [post.content];
          break;
        case 'category':
          searchFields = [post.category];
          break;
        default:
          searchFields = [post.title, post.category, post.excerpt, post.content, ...post.tags];
      }

      return searchFields.some(field => {
        const fieldLower = field.toLowerCase();
        
        if (useFuzzy) {
          return this.fuzzyMatch(fieldLower, queryLower);
        } else {
          // Support boolean operators
          return this.booleanSearch(fieldLower, queryLower);
        }
      });
    });
  }

  fuzzyMatch(text, query) {
    const threshold = 0.8;
    return this.similarityScore(text, query) >= threshold || text.includes(query);
  }

  similarityScore(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  booleanSearch(text, query) {
    // Simple boolean search implementation
    if (query.includes(' AND ')) {
      return query.split(' AND ').every(term => text.includes(term.trim()));
    } else if (query.includes(' OR ')) {
      return query.split(' OR ').some(term => text.includes(term.trim()));
    } else if (query.startsWith('NOT ')) {
      return !text.includes(query.substring(4).trim());
    } else {
      return text.includes(query);
    }
  }

  applyFilters(posts) {
    let filtered = [...posts];

    // Date range filter
    if (this.dateFrom.value || this.dateTo.value) {
      const fromDate = this.dateFrom.value ? new Date(this.dateFrom.value) : new Date('1970-01-01');
      const toDate = this.dateTo.value ? new Date(this.dateTo.value) : new Date();
      
      filtered = filtered.filter(post => {
        const postDate = new Date(post.date);
        return postDate >= fromDate && postDate <= toDate;
      });
    }

    // Category filter
    const activeCategories = this.getActiveCategories();
    if (activeCategories.length > 0) {
      filtered = filtered.filter(post => activeCategories.includes(post.category));
    }

    // Tag filter
    const activeTags = this.getActiveTags();
    if (activeTags.length > 0) {
      filtered = filtered.filter(post => 
        activeTags.some(tag => post.tags.includes(tag))
      );
    }

    return filtered;
  }

  sortResults(results, query) {
    const sortBy = this.sortBy.value;

    switch (sortBy) {
      case 'relevance':
        if (query) {
          return results.sort((a, b) => this.calculateRelevance(b, query) - this.calculateRelevance(a, query));
        }
        return results;
      case 'date-desc':
        return results.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'date-asc':
        return results.sort((a, b) => new Date(a.date) - new Date(b.date));
      case 'title':
        return results.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return results;
    }
  }

  calculateRelevance(post, query) {
    let score = 0;
    const queryLower = query.toLowerCase();

    // Title matches get highest score
    if (post.title.toLowerCase().includes(queryLower)) {
      score += 10;
    }

    // Tag matches
    if (post.tags.some(tag => tag.toLowerCase().includes(queryLower))) {
      score += 5;
    }

    // Category matches
    if (post.category.toLowerCase().includes(queryLower)) {
      score += 3;
    }

    // Content matches
    const contentMatches = (post.content.toLowerCase().match(new RegExp(queryLower, 'g')) || []).length;
    score += contentMatches;

    return score;
  }

  displayResults(results, query = '') {
    if (results.length === 0) {
      this.searchResults.style.display = 'none';
      this.noResults.style.display = 'block';
      this.resultsHeader.textContent = '';
      return;
    }

    this.searchResults.style.display = 'block';
    this.noResults.style.display = 'none';

    // Update results header
    const queryText = query ? ` for "${query}"` : '';
    this.resultsHeader.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} found${queryText}`;

    // Group by category if enabled
    if (this.groupByCategory.checked) {
      this.displayGroupedResults(results, query);
    } else {
      this.displayFlatResults(results, query);
    }
  }

  displayFlatResults(results, query) {
    const showExcerpts = this.showExcerpts.checked;
    
    const html = results.map(post => this.createResultHtml(post, query, showExcerpts)).join('');
    this.searchResults.innerHTML = html;
  }

  displayGroupedResults(results, query) {
    const groupedResults = {};
    
    results.forEach(post => {
      if (!groupedResults[post.category]) {
        groupedResults[post.category] = [];
      }
      groupedResults[post.category].push(post);
    });

    const html = Object.keys(groupedResults).map(category => {
      const categoryPosts = groupedResults[category];
      const postsHtml = categoryPosts.map(post => 
        this.createResultHtml(post, query, this.showExcerpts.checked)
      ).join('');
      
      return `
        <div class="category-group">
          <h3 class="category-group-header">${category} (${categoryPosts.length})</h3>
          ${postsHtml}
        </div>
      `;
    }).join('');

    this.searchResults.innerHTML = html;
  }

  createResultHtml(post, query, showExcerpt) {
    const highlightedTitle = query ? this.highlightMatch(post.title, query) : post.title;
    const highlightedExcerpt = query && showExcerpt ? this.highlightMatch(post.excerpt, query) : post.excerpt;
    
    const tagsHtml = post.tags.map(tag => 
      `<span class="result-tag">${tag}</span>`
    ).join('');

    const excerptHtml = showExcerpt ? `
      <div class="result-excerpt">${highlightedExcerpt}</div>
    ` : '';

    return `
      <div class="result-item" onclick="window.location.href='${post.url}'">
        <h3 class="result-title">
          <a href="${post.url}">${highlightedTitle}</a>
        </h3>
        <div class="result-meta">
          <span class="result-category">${post.category}</span>
          <span class="result-date">${new Date(post.date).toLocaleDateString()}</span>
          <div class="result-tags">${tagsHtml}</div>
        </div>
        ${excerptHtml}
      </div>
    `;
  }

  highlightMatch(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  displayAllPosts() {
    this.filteredPosts = [...this.posts];
    this.displayResults(this.posts);
  }

  hasActiveFilters() {
    return this.dateFrom.value || this.dateTo.value || 
           this.getActiveCategories().length > 0 || 
           this.getActiveTags().length > 0;
  }

  getActiveCategories() {
    return Array.from(this.categoryFilters.querySelectorAll('.category-tag.active'))
      .map(btn => btn.dataset.category);
  }

  getActiveTags() {
    return Array.from(this.tagCloud.querySelectorAll('.tag-item.active'))
      .map(btn => btn.dataset.tag);
  }

  handleCategoryClick(e) {
    if (e.target.classList.contains('category-tag')) {
      e.target.classList.toggle('active');
      this.performSearch();
    }
  }

  handleTagClick(e) {
    if (e.target.classList.contains('tag-item')) {
      e.target.classList.toggle('active');
      this.performSearch();
    }
  }

  toggleCategory(category) {
    const categoryBtn = this.categoryFilters.querySelector(`[data-category="${category}"]`);
    if (categoryBtn) {
      categoryBtn.classList.toggle('active');
    }
  }

  toggleTag(tag) {
    const tagBtn = this.tagCloud.querySelector(`[data-tag="${tag}"]`);
    if (tagBtn) {
      tagBtn.classList.toggle('active');
    }
  }

  clearSearchInput() {
    this.searchInput.value = '';
    this.hideSuggestions();
    this.displayAllPosts();
  }

  toggleFiltersPanel() {
    this.filtersPanel.classList.toggle('active');
    this.toggleFilters.classList.toggle('active');
  }

  resetAllFilters() {
    // Clear all filter inputs
    this.searchInput.value = '';
    this.dateFrom.value = '';
    this.dateTo.value = '';
    this.searchType.value = 'all';
    this.sortBy.value = 'relevance';
    this.fuzzySearch.checked = true;
    this.groupByCategory.checked = false;
    this.showExcerpts.checked = true;

    // Clear active categories and tags
    this.categoryFilters.querySelectorAll('.category-tag.active').forEach(btn => {
      btn.classList.remove('active');
    });
    this.tagCloud.querySelectorAll('.tag-item.active').forEach(btn => {
      btn.classList.remove('active');
    });

    this.displayAllPosts();
  }

  addToSearchHistory(query) {
    if (!this.searchHistory.includes(query)) {
      this.searchHistory.unshift(query);
      this.searchHistory = this.searchHistory.slice(0, 10); // Keep only last 10
      localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
      this.displaySearchHistory();
    }
  }

  displaySearchHistory() {
    if (this.searchHistory.length === 0) {
      this.searchHistory.style.display = 'none';
      return;
    }

    const html = this.searchHistory.map(query => 
      `<span class="history-item" data-query="${query}">${query}</span>`
    ).join('');
    
    this.historyItems.innerHTML = html;
    this.searchHistory.style.display = 'block';

    // Bind history item clicks
    this.historyItems.querySelectorAll('.history-item').forEach(item => {
      item.addEventListener('click', () => {
        this.searchInput.value = item.dataset.query;
        this.performSearch();
      });
    });
  }

  updateSearchStats(query = '', resultCount = 0) {
    if (query) {
      this.searchStats[query] = (this.searchStats[query] || 0) + 1;
      localStorage.setItem('searchStats', JSON.stringify(this.searchStats));
    }

    const totalPosts = this.posts.length;
    const statsText = query ? 
      `${resultCount} of ${totalPosts} posts` : 
      `${totalPosts} posts total`;
    
    this.searchStats.textContent = statsText;
  }

  saveCurrentSearch() {
    const searchParams = {
      query: this.searchInput.value,
      searchType: this.searchType.value,
      sortBy: this.sortBy.value,
      dateFrom: this.dateFrom.value,
      dateTo: this.dateTo.value,
      categories: this.getActiveCategories(),
      tags: this.getActiveTags(),
      fuzzySearch: this.fuzzySearch.checked,
      groupByCategory: this.groupByCategory.checked,
      showExcerpts: this.showExcerpts.checked
    };

    const searchName = prompt('Enter a name for this search:');
    if (searchName) {
      const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '{}');
      savedSearches[searchName] = searchParams;
      localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
      alert('Search saved successfully!');
    }
  }
}

// Initialize the search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new AdvancedSearch();
});
