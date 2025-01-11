# Use a imagem PHP com Apache
FROM php:8.2-apache

# Instalar extensões necessárias
RUN apt-get update && apt-get install -y \
    libjpeg62-turbo-dev \
    libpng-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Copiar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configurar diretório de trabalho
WORKDIR /var/www

# Copiar código do aplicativo
COPY . .

# Instalar dependências do PHP
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Ajustar permissões
RUN chown -R www-data:www-data /var/www

# Habilitar o módulo rewrite do Apache para Laravel
RUN a2enmod rewrite

# Copiar configuração do Apache
COPY ./apache-config.conf /etc/apache2/sites-available/000-default.conf

# Expor porta 80 para Apache
EXPOSE 80

# Comando para iniciar o Apache
CMD ["apache2-foreground",""]
