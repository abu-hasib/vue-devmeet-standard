<template>
    <v-container>
        <v-layout wrap row>
            <v-flex xs12>
                <v-card class="info">
                    <v-container fluid="">
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <v-card-media
                                src="https://www.maxpixel.net/static/photo/1x/Islam-National-Museum-Saudi-Arabia-Riad-Arabia-2376472.jpg"
                                height="130px">
                                </v-card-media>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <div class="headline white--text">My Meetup</div>
                                        <div>22nd May 2018</div>
                                    </div>
                                </v-card-title>
                                <v-actions>
                                    <v-btn flat to="/meetups/1">
                                        <v-icon left light>arrow_forward</v-icon>
                                        View Meetup
                                    </v-btn>
                                </v-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
