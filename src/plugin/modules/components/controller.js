define([
    '../api/feeds',
    './feed',
    './globalPoster'
], function (
    FeedsAPI,
    Feed,
    GlobalPoster
) {
    'use strict';

    class FeedController {
        constructor(config) {
            // this.token = null;
            let runtime = config.runtime;
            this.token = runtime.service('session').getAuthToken();
            this.notes = [];
            this.element = document.createElement('div');
            this.element.style.display = 'none';

            this.globalFeed = new Feed({
                runtime: runtime,
                refreshFn: this.refreshFeed.bind(this),
                feedName: 'Global',
                showControls: false,
                showSeen: false
            });
            this.userFeed = new Feed({
                runtime: runtime,
                refreshFn: this.refreshFeed.bind(this),
                feedName: 'User',
                showControls: true,
                showSeen: true
            });

            if (runtime.service('session').getCustomRoles().includes('FEEDS_ADMIN')) {
                this.globalPoster = new GlobalPoster({
                    afterSubmitFn: this.refreshFeed.bind(this),
                    runtime: runtime
                });
                this.element.appendChild(this.globalPoster.element);
            }

            this.element.appendChild(this.globalFeed.element);
            this.element.appendChild(this.userFeed.element);
            this.feedsApi = FeedsAPI.make(runtime.getConfig('services.feeds.url'), this.token);

            this.initialize('User');

        }

        initialize(displayName) {
            this.displayName = displayName;
            this.userFeed.setUserName(displayName + "'s");
            this.removeFeed();
            this.refreshFeed({});
        }

        removeFeed() {
            this.element.style.display = 'none';
            this.globalFeed.remove();
            this.userFeed.remove();
        }

        /**
         *
         * @param {object} filters
         *  - reverseSort - boolean
         *  - verb - string or int
         *  - level - string or int
         *  - source - string
         *  - includeSeen - boolean
         */
        refreshFeed(filters) {
            this.feedsApi.getNotifications(filters)
                .then(response => {
                    return response.json();
                })
                .then(feed => {
                    console.log(feed);
                    this.renderFeed(feed);
                })
                .catch(err => {
                    this.renderError(err);
                });
        }

        renderFeed(feed) {
            this.removeFeed();
            this.globalFeed.updateFeed(feed.global, this.token);
            this.userFeed.updateFeed(feed.user, this.token);
            this.element.style.removeProperty('display');
        }

        renderError(err) {
            console.log(err);
            console.log(JSON.stringify(err));
            this.element.innerHTML = `
                <div class="alert alert-danger">
                    An error occurred while fetching your feed!
                </div>
            `;
        }
    }

    return FeedController;
});