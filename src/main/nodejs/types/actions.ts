export interface IHeadersMap {
  [key: string]: string
}

export interface IVariablesCreateTweet {
  tweet_text: string
  dark_request: boolean
  media: {
    media_entities: []
    possibly_sensitive: boolean
  }
  semantic_annotation_ids: []
  disallowed_reply_options: string | null
}
