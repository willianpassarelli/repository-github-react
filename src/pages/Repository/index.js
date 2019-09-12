import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaCircleNotch } from 'react-icons/fa';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';

import {
  Loading,
  Owner,
  IssueList,
  IssueLabel,
  IssueFilter,
  IssuePage,
} from './styles';

export default class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: {},
      issues: [],
      loading: true,
      filters: [
        { state: 'all', label: 'Todas', active: true },
        { state: 'open', label: 'Abertas', active: false },
        { state: 'closed', label: 'Fechadas', active: false },
      ],
      filterIndex: 0,
      page: 1,
      results: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters.find(f => f.active).state,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  loadIssues = async () => {
    const { match } = this.props;
    const { filters, filterIndex, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 5,
        page,
      },
    });

    if (response.data.length === 0) {
      this.setState({ results: true, page: page - 1 });
    } else {
      this.setState({ issues: response.data, results: false });
    }
  };

  handleFilterClick = async filterIndex => {
    await this.setState({ filterIndex, page: 1 });
    this.loadIssues();
  };

  handlePage = async e => {
    const { page } = this.state;

    await this.setState({ page: e === 'back' ? page - 1 : page + 1 });
    this.loadIssues();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filterIndex,
      filters,
      page,
      results,
    } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaCircleNotch />
        </Loading>
      );
    }
    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <IssueList>
          <IssueFilter active={filterIndex}>
            {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.label}
                onClick={() => {
                  this.handleFilterClick(index);
                }}
              >
                {filter.label}
              </button>
            ))}
          </IssueFilter>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <IssueLabel key={String(label.id)} color={label.color}>
                      {label.name}
                    </IssueLabel>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          <IssuePage>
            <FaChevronLeft
              type="button"
              disabled={page < 2}
              onClick={() => this.handlePage('back')}
            />
            <span>Página {page}</span>
            <FaChevronRight
              type="button"
              disabled={results}
              onClick={() => this.handlePage('next')}
            />
          </IssuePage>
        </IssueList>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
};
