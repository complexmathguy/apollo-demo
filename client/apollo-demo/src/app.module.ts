import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatDatepickerModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatSelectModule } from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav'


import { IndexPlayerComponent } from './components/Player/index/index.component';
import { CreatePlayerComponent } from './components/Player/create/create.component';
import { EditPlayerComponent } from './components/Player/edit/edit.component';
import { IndexLeagueComponent } from './components/League/index/index.component';
import { CreateLeagueComponent } from './components/League/create/create.component';
import { EditLeagueComponent } from './components/League/edit/edit.component';
import { IndexTournamentComponent } from './components/Tournament/index/index.component';
import { CreateTournamentComponent } from './components/Tournament/create/create.component';
import { EditTournamentComponent } from './components/Tournament/edit/edit.component';
import { IndexMatchupComponent } from './components/Matchup/index/index.component';
import { CreateMatchupComponent } from './components/Matchup/create/create.component';
import { EditMatchupComponent } from './components/Matchup/edit/edit.component';
import { IndexGameComponent } from './components/Game/index/index.component';
import { CreateGameComponent } from './components/Game/create/create.component';
import { EditGameComponent } from './components/Game/edit/edit.component';

import * as appRoutes from './routerConfig';

import { PlayerService } from './services/Player.service';
import { LeagueService } from './services/League.service';
import { TournamentService } from './services/Tournament.service';
import { MatchupService } from './services/Matchup.service';
import { GameService } from './services/Game.service';

@NgModule({
  declarations: [
    IndexPlayerComponent,
    CreatePlayerComponent,
    EditPlayerComponent,
    IndexLeagueComponent,
    CreateLeagueComponent,
    EditLeagueComponent,
    IndexTournamentComponent,
    CreateTournamentComponent,
    EditTournamentComponent,
    IndexMatchupComponent,
    CreateMatchupComponent,
    EditMatchupComponent,
    IndexGameComponent,
    CreateGameComponent,
    EditGameComponent,
    AppComponent
  ],
  imports: [

    BrowserModule, 
    NgbModule,
    MatMenuModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
	MatMomentDateModule,
    BrowserAnimationsModule,
	HttpClientModule, 
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,    
    RouterModule.forRoot(appRoutes.PlayerRoutes), 
    RouterModule.forRoot(appRoutes.LeagueRoutes), 
    RouterModule.forRoot(appRoutes.TournamentRoutes), 
    RouterModule.forRoot(appRoutes.MatchupRoutes), 
    RouterModule.forRoot(appRoutes.GameRoutes), 
  ],
  providers: [PlayerService,LeagueService,TournamentService,MatchupService,GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
