import {
  authenticate,
  TokenService,
  UserService,
} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  DataObject,
  Filter,
  model,
  property,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import _ from 'lodash';
import {
  PasswordHasherBindings,
  TokenServiceBindings,
  UserServiceBindings,
} from '../keys';
import {basicAuthorization} from '../middlewares/auth.midd';
import {CuadernoDeNovedades, User} from '../models';
import {Credentials, UserRepository} from '../repositories';
import {PasswordHasher, validateCredentials} from '../services';
import {
  CredentialsRequestBody,
  UserProfileSchema,
} from './specs/user-controller.specs';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class UserController {
  constructor(
    @repository(UserRepository) public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: UserService<User, Credentials>,
  ) {}

  @get('/users/count')
  @response(200, {
    description: 'User model count',
    content: {'application/json': {schema: CountSchema}},
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async count(@param.where(User) where?: Where<User>): Promise<Count> {
    return this.userRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of User model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async find(@param.filter(User) filter?: Filter<User>): Promise<User[]> {
    return this.userRepository.find(filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'User PATCH success',
  })
  @authenticate('jwt')
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: User,
  ): Promise<void> {
    await this.userRepository.updateById(id, user);
  }

  @post('/users/sign-up', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async create(
    @requestBody(CredentialsRequestBody)
    newUserRequest: Credentials,
  ): Promise<User> {
    newUserRequest.role = 'user';

    // ensure a valid email value and password value
    validateCredentials(_.pick(newUserRequest, ['email', 'password']));

    // encrypt the password
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );
    const newUser = _.omit(newUserRequest, 'password') as DataObject<User>;
    newUser.estado = false;

    try {
      // create the new user
      const savedUser = await this.userRepository.create(newUser);

      // set the password
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});

      return savedUser;
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }

  @post('/users/sign-up/admin', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async createAdmin(
    @requestBody(CredentialsRequestBody)
    newUserRequest: Credentials,
  ): Promise<User> {
    // All new users have the "customer" role by default
    newUserRequest.role = 'admin';
    // ensure a valid email value and password value
    validateCredentials(_.pick(newUserRequest, ['email', 'password']));

    // encrypt the password
    const password = await this.passwordHasher.hashPassword(
      newUserRequest.password,
    );

    const newUser = _.omit(newUserRequest, 'password') as DataObject<User>;
    if ((await this.userRepository.count()).count > 0) newUser.estado = false;

    try {
      // create the new user
      const savedUser = await this.userRepository.create(newUser);

      // set the password
      await this.userRepository
        .userCredentials(savedUser.id)
        .create({password});

      return savedUser;
    } catch (error) {
      // MongoError 11000 duplicate key
      if (error.code === 11000 && error.errmsg.includes('index: uniqueEmail')) {
        throw new HttpErrors.Conflict('Email value is already taken');
      } else {
        throw error;
      }
    }
  }

  @get('/users/{userId}', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async findById(@param.path.string('userId') userId: string): Promise<User> {
    return this.userRepository.findById(userId);
  }

  @get('/users/me', {
    responses: {
      '200': {
        description: 'The current user profile',
        content: {
          'application/json': {
            schema: UserProfileSchema,
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async printCurrentUser(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<User> {
    const userId = currentUserProfile[securityId];
    return this.userRepository.findById(userId);
  }

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);

    if (!user.estado) {
      throw new HttpErrors[401]('El usuario esta inhabilitado');
    }
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);

    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);

    return {token};
  }

  //user - cuaderno de novedades relation
  @get('/users/{id}/cuaderno-de-novedades', {
    responses: {
      '200': {
        description: 'Array of User has many CuadernoDeNovedades',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CuadernoDeNovedades),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async findCuadernoDeNovedades(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<CuadernoDeNovedades>,
  ): Promise<CuadernoDeNovedades[]> {
    return this.userRepository.cuadernoDeNovedades(id).find(filter);
  }

  @post('/users/{id}/cuaderno-de-novedades', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {
          'application/json': {schema: getModelSchemaRef(CuadernoDeNovedades)},
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async createCuadernoDeNovedades(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuadernoDeNovedades, {
            title: 'NewCuadernoDeNovedadesInUser',
            exclude: ['id'],
            optional: ['userId'],
          }),
        },
      },
    })
    cuadernoDeNovedades: Omit<CuadernoDeNovedades, 'id'>,
  ): Promise<CuadernoDeNovedades> {
    return this.userRepository
      .cuadernoDeNovedades(id)
      .create(cuadernoDeNovedades);
  }

  @authenticate('jwt')
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  @patch('/users/{id}/cuaderno-de-novedades', {
    responses: {
      '200': {
        description: 'User.CuadernoDeNovedades PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patchCuadernoDeNovedades(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CuadernoDeNovedades, {partial: true}),
        },
      },
    })
    cuadernoDeNovedades: Partial<CuadernoDeNovedades>,
    @param.query.object('where', getWhereSchemaFor(CuadernoDeNovedades))
    where?: Where<CuadernoDeNovedades>,
  ): Promise<Count> {
    return this.userRepository
      .cuadernoDeNovedades(id)
      .patch(cuadernoDeNovedades, where);
  }

  @del('/users/{id}/cuaderno-de-novedades', {
    responses: {
      '200': {
        description: 'User.CuadernoDeNovedades DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: undefined,
    voters: [basicAuthorization],
  })
  async deleteCuadernoDeNovedades(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(CuadernoDeNovedades))
    where?: Where<CuadernoDeNovedades>,
  ): Promise<Count> {
    return this.userRepository.cuadernoDeNovedades(id).delete(where);
  }
}
