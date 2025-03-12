import { IVariablesCreateTweet } from './../types/actions'

export const defaultVariablesCreateTweet: IVariablesCreateTweet = {
  tweet_text: '',
  dark_request: false,
  media: {
    media_entities: [],
    possibly_sensitive: false
  },
  semantic_annotation_ids: [],
  disallowed_reply_options: null
}
