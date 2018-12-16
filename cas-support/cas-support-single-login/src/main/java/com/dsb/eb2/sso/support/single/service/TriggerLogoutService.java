package com.dsb.eb2.sso.support.single.service;

import org.apereo.cas.CentralAuthenticationService;
import org.apereo.cas.authentication.Authentication;
import org.apereo.cas.ticket.Ticket;
import org.apereo.cas.ticket.TicketGrantingTicket;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.Collection;

public class TriggerLogoutService {
    private final Log logger = LogFactory.getLog(this.getClass());
    private CentralAuthenticationService service;

    public TriggerLogoutService(CentralAuthenticationService service) {
        this.service = service;
    }

    public void triggerLogout(String id, String tgt) {
        Collection<Ticket> tickets = this.service.getTickets(ticket -> {
            if(ticket instanceof TicketGrantingTicket) {
                TicketGrantingTicket t = ((TicketGrantingTicket)ticket).getRoot();
                Authentication authentication = t.getAuthentication();
                return t != null && authentication != null
                        && authentication.getPrincipal() != null && id.equals(authentication.getPrincipal().getId())
                        && !tgt.equals(t.getId());
            } else {
                return false;
            }

        });

        if (tickets != null && tickets.size() > 0) {
            logger.info(String.format("[%s]force to remove the session", id, tickets.size()));
        }

        for (Ticket ticket : tickets) {
            service.destroyTicketGrantingTicket(ticket.getId());
        }
    }
}
