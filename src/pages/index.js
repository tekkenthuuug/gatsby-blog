import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h3`
  margin-bottom: 20px;
`

const IndexPage = ({ data }) => {
  const { allMarkdownRemark } = data
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <h1>Maksim's Thoughts ({data.allMarkdownRemark.totalCount})</h1>
        {allMarkdownRemark.edges.map(
          ({ node: { id, frontmatter, excerpt, fields } }) => (
            <div key={id}>
              <BlogLink to={fields.slug}>
                <BlogTitle>
                  {frontmatter.title} - {frontmatter.date}
                </BlogTitle>
              </BlogLink>
              <p> {excerpt} </p>
            </div>
          )
        )}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          html
          frontmatter {
            date
            description
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
