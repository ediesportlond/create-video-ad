function main() {
  /*
Documentation: https://developers.google.com/google-ads/scripts/docs/features/video-campaigns
*/

const advertisingChannelSubType = "null";
const campaignName = '"camlanGames"';
const adGroupType = "VIDEO_TRUE_VIEW_IN_STREAM";
const adGroupName = "Video Ad Group";
const youtubeVideoName = "Some Video";
const youTubeVideoId = "dQw4w9WgXcQ";
const adName = "Video Ad";
const finalUrl = "https://itseddies.com";
const displayUrl = "itseddies.com";

/*
Video ad formats

Supported video ad formats differ by the type of video campaign. 
To ensure you're selecting the right kind of video campaign, add a 
withCondition call on AdvertisingChannelSubType.

Some video campaigns have subtypes which restrict the kinds of ads 
that are supported within that campaign. Specifically, VIDEO_ACTION 
campaigns only support the VIDEO_RESPONSIVE ad type, and VIDEO_NON_SKIPPABLE 
campaigns only support the NON_SKIPPABLE_INSTREAM_VIDEO_AD ad type.

The best way to operate on specific types of campaigns is to use a withCondition 
clause in your selector. You can update the AdvertisingChannelSubType for 
the campaign type of interest:

Video campaigns with no subtype support the following video ad formats:

TrueView in-stream
TrueView video discovery
Bumper

In-stream video ads can play before, during, or after other videos, giving users 
the option to skip after a specified time. Video discovery ads appear on the 
Display Network and various YouTube pages and will only play if a user actively 
clicks on the ad thumbnail first. Bumper ads are 6-seconds or shorter and can 
appear on YouTube videos, or on videos on partner sites and apps on the 
Display Network. For complete details on each of these ad types, see About video 
ad formats.
https://support.google.com/google-ads/answer/2375464
*/

const campaignIterator = AdsApp.videoCampaigns()
  .withCondition(`campaign.name = ${campaignName}`)
  .get();

  const videoCampaign = campaignIterator.next();
/*
Build the ad group

You create a video ad group through the newVideoAdGroupBuilder() method of a video 
campaign. You need to specify an ad group type and an ad group name when creating 
the ad group. The ad group type must be one of the following, and cannot be changed 
after the ad group is created:

TRUE_VIEW_IN_STREAM
TRUE_VIEW_IN_DISPLAY
BUMPER
VIDEO_RESPONSIVE (for VIDEO_ACTION campaigns only)
NON_SKIPPABLE_INSTREAM_VIDEO_AD (for VIDEO_NON_SKIPPABLE campaigns only)
*/

const videoAdGroup =
  videoCampaign.newVideoAdGroupBuilder()
    .withAdGroupType(adGroupType)
    .withName(adGroupName)
    .build()
    .getResult();

/*
Create the video asset

Video ads generally need to reference a video asset. This determines which 
video will be played for the ad. You cannot upload a video using scripts, but you 
can link an existing YouTube video you've previously uploaded for usage in your ads. 
You do this by creating an Asset with the YouTubeVideoAssetBuilder.
*/

const assetOperation = AdsApp.adAssets().newYouTubeVideoAssetBuilder()
  .withName(youtubeVideoName)
  // This is the ID in the URL for the YouTube video.
  .withYouTubeVideoId(youTubeVideoId)
  .build();
const videoAsset = assetOperation.getResult();

/*
Build the ad

To create a new ad, use the builder method matching the ad group type 
(chained after newVideoAd()):

inStreamAdBuilder()
videoDiscoveryAdBuilder()
bumperAdBuilder()
responsiveVideoAdBuilder() (for VIDEO_ACTION campaigns only)
nonSkippableAdBuilder() (for VIDEO_NON_SKIPPABLE campaigns only)
*/

const videoAd = videoAdGroup.newVideoAd()
  .inStreamAdBuilder()
  // Specify the video asset created in the last step.
  .withVideo(videoAsset)
  .withAdName(adName)
  .withDisplayUrl(displayUrl)
  .withFinalUrl(finalUrl)
  .build()
  .getResult();
}
