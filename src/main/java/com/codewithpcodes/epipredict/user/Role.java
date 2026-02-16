package com.codewithpcodes.epipredict.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.codewithpcodes.epipredict.user.Permissions.*;

@RequiredArgsConstructor
@Getter
public enum Role {
    ADMIN(
            Set.of(
                    ADMIN_READ,
                    ADMIN_CREATE,
                    ADMIN_DELETE,
                    ADMIN_UPDATE
            )
    ),
    CLINICIAN(Collections.emptySet()),
    CHW(Collections.emptySet());

    private final Set<Permissions> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        // 1. Convert Permissions to Authorities
        List<SimpleGrantedAuthority> authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());

        // 2. Add the Role itself as an Authority (prefixed with ROLE_)
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));

        return authorities;
    }

}
