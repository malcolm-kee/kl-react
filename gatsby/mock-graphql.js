/**
 * Generate mock graphql schema for Twitter during development
 */
exports.createMockTwitterSchema = function createMockTwitterSchema() {
  return [
    `type twitterFavoritesListReacttweetsExtended_entitiesMediaVideo_infoVariants {
        bitrate: Int
        content_type: String
        url: String
      }
  
      type twitterFavoritesListReacttweetsExtended_entitiesMediaVideo_info {
        duration_millis: Int
        variants: [twitterFavoritesListReacttweetsExtended_entitiesMediaVideo_infoVariants]
      }
  
      type twitterFavoritesListReacttweetsExtended_entitiesMedia {
        type: String
        media_url_https: String
        ext_alt_text: String
        video_info: twitterFavoritesListReacttweetsExtended_entitiesMediaVideo_info
      }
      
      type twitterFavoritesListReacttweetsExtended_entities {
        media: [twitterFavoritesListReacttweetsExtended_entitiesMedia]
      }
  
      type twitterFavoritesListReacttweetsUser {
        name: String
        profile_image_url_https: String
      }
      
      type twitterFavoritesListReacttweets implements Node {
        is_quote_status: Boolean
        extended_entities: twitterFavoritesListReacttweetsExtended_entities
        user: twitterFavoritesListReacttweetsUser
      }`,
  ];
};
