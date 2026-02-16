package com.codewithpcodes.epipredict.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum Permissions {

    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),

    CHW_READ("chw:read"),
    CHW_UPDATE("chw:update"),
    CHW_CREATE("chw:create"),
    CHW_DELETE("chw:delete"),

    CLINICIAN_READ("clinician:read"),
    CLINICIAN_UPDATE("clinician:update"),
    CLINICIAN_CREATE("clinician:create"),
    CLINICIAN_DELETE("clinician:delete");

    private final String permission;
}
