import React from "react";
import { Query } from "react-apollo";

// import components
import Loading from "./Loading";

// import queries / mutations / fragments
import { GET_REPOSITORIES_OF_ORGANIZATION } from "../gql-types";
import Error from "./Error";
import RepoList from "./Repository/RepoList";

const Organization = ({ organizationName }) => (
	<Query
		query={GET_REPOSITORIES_OF_ORGANIZATION}
		variables={{ organizationName }}
		skip={organizationName === ""}
		notifyOnNetworkStatusChange={true}
	>
		{({ data, loading, error, fetchMore }) => {
			if (error) return <Error error={error} />;
			if (data === undefined) return <Error error={error} />;

			const { organization } = data;
			if (loading && !organization) return <Loading />;

			return (
				<RepoList
					loading={loading}
					repositories={organization.repositories}
					fetchMore={fetchMore}
					entry="organization"
				/>
			);
		}}
	</Query>
);

export default Organization;
