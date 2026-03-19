package com.codewithpcodes.epipredict.weather;

import lombok.Data;

@Data
public class WeatherApiResponse {
    private Main main;
    private Rain rain;

    @Data
    public static class Main {
        private Double temp;
        private Double humidity;
    }

    @Data
    public static class Rain {
        private Double oneHour;

        public Double getOneHour() {
            return oneHour == null ? 0.0 : oneHour;
        }
    }
}
