package edu.ucsb.cs156.kitchensink.config;

import java.util.HashSet;
import java.util.Set;
import java.util.Map;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUserAuthority;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import lombok.extern.slf4j.Slf4j;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@Slf4j
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests(authorize -> authorize
          .mvcMatchers("/api/docs").permitAll()
          .mvcMatchers("/api/admin/**").hasRole("ADMIN")
          .mvcMatchers("/api/**").permitAll()
          .anyRequest().permitAll()
        )
        .exceptionHandling(handlingConfigurer -> handlingConfigurer
          .authenticationEntryPoint(new Http403ForbiddenEntryPoint())
        )
        .oauth2Login( oauth2 -> oauth2.userInfoEndpoint(userInfo -> userInfo.userAuthoritiesMapper(this.userAuthoritiesMapper())))
        .csrf(csrf -> csrf
            .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
        )
        .logout(logout -> logout
            .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
            .logoutSuccessUrl("/")
        );
    ;
  }

  @Override
  public void configure(WebSecurity web) throws Exception {
    web.ignoring().antMatchers("/h2-console/**");
  }

  private GrantedAuthoritiesMapper userAuthoritiesMapper() {
    return (authorities) -> {
        Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

        authorities.forEach(authority -> {
            log.info("********** authority={}",authority);
            if (OidcUserAuthority.class.isInstance(authority)) {
                OidcUserAuthority oidcUserAuthority = (OidcUserAuthority)authority;

                OidcIdToken idToken = oidcUserAuthority.getIdToken();
                OidcUserInfo userInfo = oidcUserAuthority.getUserInfo();

                log.info("********** idToken={}",idToken);
                log.info("********** userInfo={}",userInfo);

                // Map the claims found in idToken and/or userInfo
                // to one or more GrantedAuthority's and add it to mappedAuthorities

            } else if (OAuth2UserAuthority.class.isInstance(authority)) {
                OAuth2UserAuthority oauth2UserAuthority = (OAuth2UserAuthority)authority;

                Map<String, Object> userAttributes = oauth2UserAuthority.getAttributes();
                log.info("********** userAttributes={}",userAttributes);

                if (userAttributes.get("email").equals("phtcon@ucsb.edu")) {
                  mappedAuthorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                }
                // Map the attributes found in userAttributes
                // to one or more GrantedAuthority's and add it to mappedAuthorities
            }
        });

        return mappedAuthorities;
    };
}


}